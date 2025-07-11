---
title: Other Systems
description: How to download and install other OS to XpressReal SBC.
---

In addition to openFyde, the XpressReal supports other operating systems, such as Linux and Android. 
You can download the OS images from our [Resource Download](/reference/resource-download/) page to 
experiment with different systems.

## Install Custom Linux Image

Our Linux OS images are built with the Yocto Project. Use `balenaEtcher` to flash a downloaded image to a microSD card, then boot your XpressReal from it.
Refer to the [Getting Started Guide](/guides/getting-started/) for flashing instructions.

## Install Android OS Image

Installing the Android image requires flashing files via the RTD1619B chip's recovery mode. 
First, ensure the serial port is connected correctly as described in the [Hardware Interface](/reference/hardware-interface/#uart-serial-console) document.

Next, download the Android Image from our Resource Download page and extract the .zip archive. 
You will find two folders inside: `lk` and `image`. The contents are used as follows: 
files in the `lk` folder need to be uploaded to the XpressReal through the serial port, 
while files in the `image` folder need to be copied to a USB drive.

:::caution

Please ensure that your serial terminal software supports file transfers via the Y-modem protocol.
For Windows users, we recommend using [Tera Term](https://teratermproject.github.io/index-en.html).

:::

### 0. Serial setup

Connect serial to XpressReal, set the baud rate to `460800` in Tera Term:

![Open Baudrate Setup](../../../assets/android/set-baudrate-menu.webp)

![Setup Baudrate](../../../assets/android/set-baudrate.webp)

### 1. Enter recovery mode

With baud rate seting up, connect serial port in Tera Term. Pressing `ctrl-q` the power up the XpressReal,
it will enter recovery mode:

![Recovery Mode](../../../assets/android/recovery-mode.webp)

### 2. Upload files with Y-modem

Press `h` in keyboard, then send `RTD1619B_hwsetting_BOOT_LPDDR4_32Gb_ddp_s1600_final.bin` file by Y-modem protocol:

![Sending file](../../../assets/android/y-modem-send.webp)

Press `d` in keyboard, then send `uda_emmc.bind.bin` file, when it finished, press `g` to write uploaded file to eMMC.

Press `d` in keyboard, then send `boot_emmc.bind.bin` file, when it finished, press `b1` and `b2` to write uploaded file to eMMC.

### 3. Reboot to uboot

After upload and write those files, replug the power supply to reboot XpressReal, it will enter uboot by default:

![Uboot Prompt](../../../assets/android/uboot-prompt.webp)

Enter the following commands to setup sysparam

```
sysparam default
sysparam save
```

### 4. Copy image to USB drive

Copy all the files in `image` folder to the root of the USB drive, then plug the USB drive to the USB 3.0 Type-C port.

:::caution

Make sure the file system of your USB drive is `FAT32` and the sector size of `FAT32` is `512` because
the uboot XpressReal used only support this sector size.

Your can prepare the file system with the this command in a Linux console:
```bash
mkfa.vfat -S 512 /dev/sdXXX
```

:::

### 5. Install Android to eMMC

Plug the USB drive to XpressReal, type `boot ru` in uboot to start the installation:

![Android Install](../../../assets/android/android-install.webp)

Wait for a while, when it finished, XpressReal will reboot to Android.

![Android desktop](../../../assets/android/android-desktop.webp)

:::note

### Restoring openFyde OS from an Android System

1. Download the `recovery-uboot.zip` archive from the official [Android Image Release](https://github.com/XpressReal/android-image/releases) page.

2. Extract the downloaded `.zip` archive to a folder on your computer.

3. Enter recovery mode by following the instructions in the [Serial Setup](#0-serial-setup) and [Enter Recovery Mode](#1-enter-recovery-mode) sections of the documentation.

4. Press `h`, then upload the `RTD1619B_hwsetting_BOOT_LPDDR4_32Gb_ddp_s1600_final.bin` file using Y-modem protocol.

5. Press `d`, then upload the `rtd1619b_emmc_bind_4gb.bin` file.

6. Press `b1` and `b2` to write uploaded file to `Boot Area 1` and `Boot Area 2` of eMMC.

7. Now u-boot has been restored, you can install openFyde OS according to [Getting Started](/guides/getting-started) and [Install openFyde](/guides/openfyde) guides.

:::

## Further reading

- Read [Building Custom Linux](/guides/building-yocto) for how to build system images using yocto.