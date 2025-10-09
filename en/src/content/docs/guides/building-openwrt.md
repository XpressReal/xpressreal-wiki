---
title: Building OpenWrt
description: How to set up OpenWrt building environment for XpressReal T3 SBC.
---
## Introduction
The OpenWrt is a Linux operating system targeting embedded devices. This guide describes how to set up OpenWrt building environment for XpressReal T3 SBC.
## System requirement
### Operating system
* Ubuntu 24.04/22.04/20.04 LTS
* Fedora 39/40/41
* Debian GNU/Linux 11/12
### Minimum Free Disk Space
To build an image for the XpressReal T3, you need a system with at least 20 GB of free disk space.
### Minimum System RAM
You will manage to build an image for the XpressReal T3 with as little as 8 GB of RAM on an old system with 4 CPU cores, but your builds will
be much faster on a system with as much RAM and as many CPU cores as possible.
## System preparation
### Ubuntu/Debian Packages
Here are the packages needed to build an image on a headless system with a supported Ubuntu or Debian Linux distribution:
```bash
sudo apt update
sudo apt install build-essential clang flex bison g++ gawk \
gcc-multilib g++-multilib gettext git libncurses-dev libssl-dev \
python3-distutils python3-setuptools rsync swig unzip zlib1g-dev file wget
```
### Fedora Packages
Here are the packages needed to build an image on a headless system with a supported Fedora Linux distribution:
```bash
sudo dnf --setopt install_weak_deps=False --skip-broken install \
bash-completion bzip2 file gcc gcc-c++ git-core make ncurses-devel patch \
rsync tar unzip wget which diffutils python3 python3-setuptools perl-base \
perl-Data-Dumper perl-File-Compare perl-File-Copy perl-FindBin \
perl-IPC-Cmd perl-JSON-PP perl-lib perl-Thread-Queue perl-Time-Piece
```
### Shell
You need to ensure you are using `bash` as your default `$SHELL`.
## Fetch OpenWrt source
Fetch OpenWrt source code from GitHub repository:
```bash
git clone https://github.com/XpressReal/openwrt.git
cd openwrt
```
## Update and install feeds
Update and install the package feeds:
```bash
./scripts/feeds update -a
./scripts/feeds install -a
```
## Configure the build system
You can start with the default configuration for XpressReal T3:
```bash
cp defconfigs/xpressreal_t3_rtd1619b_defconfig .config
```
Then run `make menuconfig` to customise the configuration as needed:
```bash
make menuconfig
```
Make sure to select the correct Target System, Subtarget, and Target Profile for XpressReal T3 if not already set:
- Target System (RealTek DHC)
- Subtarget (RealTek RTD1619B boards)
- Target Profile (XpressReal T3)
You can also customise other options such as additional packages and features according to your requirements.
## Build the image
Once you have configured the build system, you can start the build process by running:
```bash
make -j$(nproc)
```
This will compile the OpenWrt firmware image for the XpressReal T3 based on your configuration.
The build process may take some time depending on your system's performance and the selected configuration.
After the build is complete, you can find the generated firmware image in the `bin/targets/rtd/rtd1619b/` directory within the OpenWrt source tree.
The firmware image file will be named something like `openwrt-rtd-rtd1619b-rtd_xpressreal-t3-<fs_type>-sdcard.img.gz`.