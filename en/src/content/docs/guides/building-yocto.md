---
title: Building Custom Linux
description: How to use yocto to build custom Linux system images for XpressReal SBC.
---

## Introduction

The Yocto Project is an open-source collaboration project that provides tools and a framework for building custom Linux-based systems for embedded devices. It allows developers to create tailored Linux distributions, regardless of the underlying hardware architecture, and manage software stacks, configurations, and best practices.

This guide will show you how to build custom Linux images for XpressReal with Yocto building system.

## System requirement

### Operating system

* Ubuntu 22.04/20.04/18.04 LTS
* Fedora 39/40/41
* Debian GNU/Linux 11/12

### Minimum Free Disk Space

To build an image such as core-image-sato for the qemux86-64 machine, you need a system with at least 90 Gbytes of free disk space. However, much more disk space will be necessary to build more complex images, to run multiple builds and to cache build artifacts, improving build efficiency.

### Minimum System RAM

You will manage to build an image such as core-image-sato for the qemux86-64 machine with as little as 8 Gbytes of RAM on an old system with 4 CPU cores, but your builds will be much faster on a system with as much RAM and as many CPU cores as possible.

## System preparation

### Ubuntu/Debian Packages

Here are the packages needed to build an image on a headless system with a supported Ubuntu or Debian Linux distribution:

```bash
sudo apt-get install build-essential chrpath cpio debianutils diffstat file gawk gcc git iputils-ping libacl1 liblz4-tool locales python3 python3-git python3-jinja2 python3-pexpect python3-pip python3-subunit socat texinfo unzip wget xz-utils zstd
```

### Fedora Packages

Here are the packages needed to build an image on a headless system with a supported Fedora Linux distribution:

```bash
sudo dnf install bzip2 ccache chrpath cpio cpp diffstat diffutils file findutils gawk gcc gcc-c++ git glibc-devel glibc-langpack-en gzip hostname libacl lz4 make patch perl perl-Data-Dumper perl-File-Compare perl-File-Copy perl-FindBin perl-Text-ParseWords perl-Thread-Queue perl-bignum perl-locale python python3 python3-GitPython python3-jinja2 python3-pexpect python3-pip rpcgen socat tar texinfo unzip wget which xz zstd
```

### locale

You also need to ensure you have the en_US.UTF-8 locale enabled:

```bash
$ locale --all-locales | grep en_US.utf8
```

### Shell

You need to ensure you are using `bash` as your default `$SHELL`.

## Fetch `yocto`

Fetch Yocto building system(scarthgap branch) from upstream.

```bash
$ mkdir yocto
# clone poky
$ git clone https://git.yoctoproject.org/poky -b scarthgap
$ cd poky
$ git checkout dabe9e157f
# clone meta-openembedded
$ git clone https://github.com/openembedded/meta-openembedded.git -b scarthgap
$ cd meta-openembedded
$ git checkout 2338409efc
```

## Fetch dependent meta
```bash
$ cd yocto/poky
# clone meta-qt5
$ git clone https://github.com/meta-qt5/meta-qt5.git -b scarthgap
$ pushd meta-qt5
$ git checkout eb82841826
$ popd
# clone meta-neural-network
$ git clone https://github.com/nnstreamer/meta-neural-network.git -b scarthgap
$ pushd meta-neural-network
$ git checkout c14458c94e
$ popd
```

## Fetch XpressReal SDK

Fetch XpressReal SDK from [XpressReal SDK](#sdk-download), then uncompress it to yocto.

```bash
$ cd yocto
$ git clone https://github.com/XpressReal/linux-sdk
$ mv linux-sdk/meta-xpressreal poky/
```

## Download prebuilt rootfs

Download the prebuilt rootfs from [Prebuilt rootfs](https://github.com/XpressReal/linux-sdk/releases/tag/prebuilt-rootfs),
place the downloaded prebuilt rootfs files to `meta-xpressreal/recipes-xpressreal/prebuilt-rootfs/files/`.

## Building system configuration

```bash
$ cd yocto/poky
$ TEMPLATECONF=meta-xpressreal/conf/templates/default source oe-init-build-env build
```

## Build Linux image

Now you can build a Linux image with `bitbake` command.

```bash
$ bitbake core-image-minimal
```

The following bitbake targets are supported:

| Target                            | Description                                           |
| --------------------------------- | ----------------------------------------------------- |
| core-image-minimal                | the minimal image which can boot the SBC              |
| debian-image                      | basic debian system without GUI                       |

:::tip

If you want to build a image with GUI(XFCE), add the following config to `yocto/poky/build/conf/local.conf`:

```
MACHINE_FEATURES:append = " xdesktop"
```

:::