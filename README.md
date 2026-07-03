# @craftthingy-digital-innovation/cty-webcam-device-manager

Bilingual documentation: [Bahasa Indonesia](#bahasa-indonesia) | [English](#english)

---

## Bahasa Indonesia

Library client-side JavaScript modular untuk menangani inisialisasi webcam, pemindaian perangkat kamera, penggantian kamera aktif, dan pengambilan gambar snapshot ke berkas canvas secara ringkas.

### Fitur Utama
- 📷 **Abstraksi API Kamera:** Membungkus kompleksitas `navigator.mediaDevices` menjadi fungsi sederhana.
- ⚙️ **Enumerasi Perangkat:** Mengambil list kamera yang terpasang lengkap dengan label identitasnya.
- 📸 **Canvas Capture:** Mengambil snapshot/frame video aktif dan mengekspornya langsung menjadi Base64 DataURL (JPEG/PNG).

### Instalasi
```bash
npm install @craftthingy-digital-innovation/cty-webcam-device-manager
```

### Cara Penggunaan
```javascript
import { WebcamDeviceManager } from '@craftthingy-digital-innovation/cty-webcam-device-manager';

const manager = new WebcamDeviceManager({
  videoElement: document.getElementById('webcam-video'),
  canvasElement: document.getElementById('webcam-canvas')
});

await manager.getDevices();
await manager.start();
const dataUrl = manager.capture();
manager.stop();
```

---

## English

A modular client-side JavaScript library to initialize webcams, scan video input devices, switch active streams, and capture snapshots to canvas elements easily.

### Key Features
- 📷 **Webcam API Wrapper:** Wraps raw `navigator.mediaDevices` streaming into clean method calls.
- ⚙️ **Device Enumeration:** Queries available camera hardware with descriptive labels.
- 📸 **Canvas Frame Capture:** Snaps high-definition image frames directly into Base64 DataURLs.

### Installation
```bash
npm install @craftthingy-digital-innovation/cty-webcam-device-manager
```

### Usage
```javascript
import { WebcamDeviceManager } from '@craftthingy-digital-innovation/cty-webcam-device-manager';

const manager = new WebcamDeviceManager({
  videoElement: document.getElementById('webcam-video'),
  canvasElement: document.getElementById('webcam-canvas')
});

await manager.getDevices();
await manager.start();
const dataUrl = manager.capture();
manager.stop();
```

## License
Licensed under Public-Source Corporate Royalty License (PSCRL). See [LICENSE](./LICENSE) for details.
