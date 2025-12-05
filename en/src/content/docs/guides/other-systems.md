---
title: Other Systems
description: How to download and install other OS to XpressReal T3 SBC.
---

In addition to openFyde/FydeOS, the XpressReal T3 supports other operating systems, such as Linux and Android. The list of supported OS will be constantly updated, with new entries being added from time to time. You can check the latest available OS images from our [Resource Download](/reference/resource-download/) page to experiment with different systems.

## Install Custom Linux Image

Our Linux OS images are built with the Yocto Project. Use `balenaEtcher` to flash a downloaded image to a microSD card, then boot your XpressReal T3 from it.

Refer to the [Getting Started Guide](/guides/getting-started/) for flashing instructions.

## Install Armbian Image

Armbian is a Debian-based Linux distribution that is optimised for ARM-based single-board computers (SBCs). It is a popular choice for developers and enthusiasts who want to run Linux on their XpressReal T3. You can download the image from our [GitHub Releases](https://github.com/XpressReal/armbian-build/releases) page and flash it to a microSD card using `balenaEtcher`. Then, boot your XpressReal T3 from the microSD card.

## Install OpenWrt Image

OpenWrt Project is a Linux operating system targeting embedded devices. Instead of trying to create a single, static firmware, OpenWrt provides a fully writable filesystem with package management. This makes it an excellent choice for network enthusiasts, developers, and power users who want to unlock advanced networking features on their XpressReal T3.

To get started, download the latest OpenWrt image from our [GitHub Releases](https://github.com/XpressReal/openwrt/releases) page ([Which image to choose?](https://openwrt.org/docs/guide-user/installation/installation_methods/sd_card#which_image_to_chose)). Flash the image to a microSD card, insert it into your XpressReal T3, and power on the device to boot into OpenWrt.

## Install Home Assistant Operating System (HAOS) Image

Home Assistant is an open-source home automation platform that prioritises local control and privacy. It is powered by a global community of tinkerers and DIY enthusiasts, and is perfect for running on the XpressReal T3.

Home Assistant Operating System (formerly HassOS) is a Linux-based system optimised to host Home Assistant and its add-ons. We've built HAOS images for XpressReal T3.

For more information, refer to our open-source [GitHub repository](https://github.com/XpressReal/Home-Assistant-Operating-System).

## Install AOSP Image

:::caution

This process will erase the whole eMMC, please backup your data before procced.

:::

You need to download both the `sdcard.img` and `xpressreal_t3-update.zip` files:
- `sdcard.img` is a bootloader to put XpressReal T3 into fastboot mode
- `xpressreal_t3-update.zip` is the actual AOSP image to flash into eMMC via fastboot

### Prerequisite

Install [Android platform tools](https://developer.android.com/tools/releases/platform-tools) for your OS.
Windows users may need to install the [fastboot device driver](https://developer.android.com/studio/run/win-usb).

### Prepare SDcard

Flash the `sdcard.img` to a SD Card using `BalenaEtcher`(or other image writing tools), then plug the SD Card into T3 and power it on.

### Connect T3 to computer

The SD Card bootloader will put T3 into **fastboot mode** automatically. You need to connect T3 to your computer with an USB cable(**using the USB Type-A port of T3**), if everything goes well, you can list it with the following command:

```
$ fastboot devices
xpressreal(emmc)	 fastboot
```

If there is no device listed, confirm you used the correct USB port and get fastboot driver installed.

### Flash AOSP

Use the following commands to flash AOSP to T3's eMMC:

```
$ fastboot oem format
$ fastboot update -w xpressreal_t3-update.zip
```

### Done
XpressReal T3 will reboot to AOSP automatically when finished. The SD Card is not need after the AOSP flashing process done, you can remove it.

### Trouble shooting

- If the `fastboot update -w xpressreal_t3-update.zip` command hang, just `ctrl-c` and retry.
- You can force T3 enter fastboot mode by pressing the "install/user" button during power on for ~10s.

### Restore to FydeOS

If you want to restore to FydeOS or other OS, just follow the installation guide of it.

## Further reading

- Read [Building Custom Linux](/guides/building-yocto) for how to build system images using Yocto.