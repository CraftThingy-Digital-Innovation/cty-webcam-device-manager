/**
 * WebcamDeviceManager Library
 * Part of CraftThingy Digital Innovation SDK
 * Licensed under Public-Source Corporate Royalty License (PSCRL)
 * Isomorphic: Safe to import in Node.js and Browser environments.
 */

export class WebcamDeviceManager {
    constructor(config = {}) {
        const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
        
        this.videoElement = (isBrowser && typeof config.videoElement === 'string') 
            ? document.querySelector(config.videoElement) 
            : config.videoElement;
            
        this.canvasElement = (isBrowser && typeof config.canvasElement === 'string') 
            ? document.querySelector(config.canvasElement) 
            : config.canvasElement;
            
        this.onDevicesFound = config.onDevicesFound || (() => {});
        this.onError = config.onError || (() => {});
        this.stream = null;
        this.activeDeviceId = null;
    }

    /**
     * Enumerate available video inputs.
     * Triggers permission dialog if not already granted.
     */
    async getDevices() {
        if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
            const err = new Error("WebcamDeviceManager.getDevices(): MediaDevices API is not supported in this environment.");
            this.onError(err);
            throw err;
        }

        try {
            // Attempt to trigger permission dialog first to get labeled devices
            const initialStream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Close initial stream immediately
            initialStream.getTracks().forEach(t => t.stop());
            
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(d => d.kind === 'videoinput');
            this.onDevicesFound(videoDevices);
            return videoDevices;
        } catch (err) {
            this.onError(err);
            throw err;
        }
    }

    /**
     * Start camera stream
     * @param {String|null} deviceId 
     */
    async start(deviceId = null) {
        this.stop();
        this.activeDeviceId = deviceId;

        if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
            const err = new Error("WebcamDeviceManager.start(): MediaDevices API is not supported in this environment.");
            this.onError(err);
            throw err;
        }
        
        const constraints = {
            video: {
                deviceId: deviceId ? { exact: deviceId } : undefined,
                width: { ideal: 1920, max: 3840 },
                height: { ideal: 1080, max: 2160 }
            }
        };

        try {
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (this.videoElement) {
                this.videoElement.srcObject = this.stream;
            }
            return this.stream;
        } catch (err) {
            this.onError(err);
            throw err;
        }
    }

    /**
     * Stop and clear current stream
     */
    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }
    }

    /**
     * Grab active video frame and render to canvas, returning DataURL
     * @param {String} format 
     * @param {Number} quality 
     */
    capture(format = 'image/jpeg', quality = 0.95) {
        if (!this.videoElement || !this.canvasElement) {
            throw new Error("Video or Canvas elements not initialized");
        }

        const video = this.videoElement;
        const canvas = this.canvasElement;
        
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;

        const ctx = canvas.getContext('2d');
        // Handle horizontal flipping if needed (optional)
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        return canvas.toDataURL(format, quality);
    }
}

if (typeof window !== 'undefined') {
    window.WebcamDeviceManager = WebcamDeviceManager;
}
