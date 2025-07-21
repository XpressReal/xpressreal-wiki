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

:::caution

If you have installed Android and want to revert to openFyde or another Linux system, you must do so via "Recovery Mode". 
This process requires a USB-to-TTL converter. Please ensure you have this device, otherwise you will not be able to switch back from the Android system.

:::

Download the Android Image from our Resource Download page and extract the .zip archive. 
You will find two folders inside: `lk` and `image`. The contents are used as follows: 
files in the `lk` folder need to be uploaded to the XpressReal through the serial port, 
while files in the `image` folder need to be copied to a USB drive.

### 1. Enter recovery mode

Follow the instructions in the [Unbrick the XpressReal](/guides/unbrick) to put your XpressReal into Recovery mode.

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
mkfs.vfat -S 512 /dev/sdXXX
```

:::

### 5. Install Android to eMMC

Plug the USB drive to XpressReal, type `boot ru` in uboot to start the installation:

![Android Install](../../../assets/android/android-install.webp)

Wait for a while, when it finished, XpressReal will reboot to Android.

![Android desktop](../../../assets/android/android-desktop.webp)

:::note

### Restoring openFyde OS from an Android System

To restore openFyde OS from Android, you need to flash the firmware of the XpressReal to the stock one, 
then refer to the [Getting Started](/guides/getting-started) guide to install openFyde OS.

Use the following instructions to restore to stock firmware.

* download stock firmware from https://github.com/XpressReal/xpressreal/tree/main/recovery-fw

* connect XpressReal with your computer and copy the downloaded firmware to Android with `adb`

```bash
adb push Downloads/rtd1619b_emmc_bind_4gb.bin /storage/emulated/0/Download/rtd1619b_emmc_bind_4gb.bin
```

* flash firmware

```bash
adb shell # connect to android shell with adb
su        # change to root

echo 0 > /sys/block/mmcblk0boot0/force_ro # disable eMMC boot area read-only
echo 0 > /sys/block/mmcblk0boot1/force_ro

dd if=//storage/emulated/0/Download/rtd1619b_emmc_bind_4gb.bin of=/dev/block/mmcblk0boot0 bs=4096 # flash firmware
dd if=//storage/emulated/0/Download/rtd1619b_emmc_bind_4gb.bin of=/dev/block/mmcblk0boot1 bs=4096
```

* the firmware of XpressReal has been restored, you can install openFyde OS now

If the Andoird system is broken or adb is not available, please refer to the instructions in the [Unbrick the XpressReal](/guides/unbrick) to revert your XpressReal to openFyde OS.

:::

## Further reading

- Read [Building Custom Linux](/guides/building-yocto) for how to build system images using yocto.