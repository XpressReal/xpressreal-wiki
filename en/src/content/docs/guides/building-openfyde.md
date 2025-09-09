---
title: Building openFyde
description: How to setup openFyde building environment for XpressReal T3 SBC.
---

## Introduction

The following sections of this document describe how to build openFyde for XpressReal T3 SBC, from its source code and the board overlay provided by openFyde.

### Typography conventions

Shell Commands are shown with different labels to indicate whether they apply to 

 - your build computer (the computer on which you're doing development)
 - the chroot (Chromium OS SDK) on your build computer
 - your Chromium OS computer (the device on which you run the images you build)


| Label     | Commands                                   |
| --------- | ------------------------------------------ |
| (outside) | on your build computer, outside the chroot |
| (inside)  | inside the chroot on your build computer   |

## System requirement

- A x86_64 system to perform the build. 64-bit hardware and OS are musts. The openFyde (and Chromium OS) is a very large project, building from the source from scratch usually takes hours to over 10 hours, depending on the system configuration.
   - CPU: we recommend using a 4-core or higher processor. The openFyde build process runs in parallel so more cores can help shorten build time dramatically.

   - Memory: we recommend at least 16GB, plus enough swap space because, for the purpose of this project, you will need to build Chromium from source code. Linking Chromium requires between 8GB and 28GB of RAM as of March 2017, so you will run into massive swapping or OOM if you have less memory. However, if you are not building your own copy of Chromium, the RAM requirements will be substantially lower at the cost of losing some of the key features provided by this project.

   - Disk: at least 150GB of free space, 200GB or more is highly recommended. SSD could noticeably shorten the build time as there are many gigabytes of files that need to be written to and read from the disk.

   - Network: total source code downloading will be over 100GB. Fast and stable Internet access is going to be very helpful.

- A x86_64 Linux OS as your main workstation, it will be referred to as the *host OS* later in this doc. The openFyde build process utilises chroot to isolate the build environment from the host OS. So theoretically any modern Linux system should work. However, only limited Linux distros are tested by the Chromium OS team and the FydeOS team. Linux versions that are known to work:

   - Ubuntu Linux 22.04 LTS
   - Arch Linux

- A non-root user account with sudo access. The build process should be run by this user, not the root user. The user needs to have _sudo_ access. For simplicity and convenience password-less sudo could be set for this user.

## Prepare the system

### Install necessary tools

Git and curl as the essential tools that need to be installed in the host OS, you will also need Python3 for most of the scripting work in the build process.

```bash
(outside)
sudo apt install build-essential git-core gitk git-gui curl lvm2 thin-provisioning-tools \
   python3-pkg-resources python3-virtualenv python3-oauth2client xz-utils
```

### Install Google depot_tools

The depot_tools is a package of useful scripts, provided by Google, to manage source code checkouts and code reviews. We need it to fetch the Chromium OS source code.

```bash
(outside)
$ cd $HOME
$ git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

```

Then add the depot_tools directory to PATH and set up proper umask for the user who is going to perform the build. Add below lines to the file `~/.bash_profile` of that user. Or if you are using a different shell, handle that accordingly.

```bash
(outside)
export PATH=$HOME/depot_tools:$PATH
umask 022
```

Then re-login to your shell session to make the above changes take effect.

### Configure git

You should configure git now or it may complain in some operations later.

```bash
(outside)
$ git config --global user.email "you@email.address"
$ git config --global user.name "Your Name"
```

## Get source code

### Create a directory structure

The directory structure described here is a recommendation based on the best practice in the Fyde Innovations team. You may host the files in a different way as you wish.

```bash
(outside)
# This is the directory to hold Chromium OS source code， aka cros-sdk
$ cd $HOME
$ mkdir -p r132
```

### Fetch Chromium OS repo

Now run these commands to fetch the source code. Find and use a different release name if you would like to build a different release.

```bash
(outside)
$ cd r132

$ repo init -u https://chromium.googlesource.com/chromiumos/manifest.git -b release-R132-16093.B

```

### Request for Google and FydeOS API keys

If you would like to login into the Chromium OS GUI by using your Google account, you will need to request for Google API key and include them in the disk image you build. 

Apply for Google API on the Google website per [this document](http://www.chromium.org/developers/how-tos/api-keys). After acquiring the client ID, client secret and API key, put them in `~/.googleapikeys` file in the format below:

```
'google_api_key': 'your api key',
'google_default_client_id': 'your client id',
'google_default_client_secret': 'your client secret',
```

Similarly, if you wish to utilise FydeOS online account and sync features provided by https://account.fydeos.com, you will need to apply for an openFyde Developer API key and include it in the same `~/.googleapikeys` file. At this moment the application is done manually by sending an email to [dev-support@openfyde.io](mailto:dev-support@openfyde.io) including your FydeOS account(you can sign up for a new one if you don't have it already) details, the team will process your application as soon as possible.

Once you have your openFyde Developer API key, you need to append it to the `~/.googleapikeys` file in the format below (note that there is no space before the `:`):

```
'fydeos_default_client_id': 'your openFyde Developer API client id',
'fydeos_default_client_secret': 'your openFyde Developer API client secret',

```

Then the Chromium OS build script will read the necessary information from this file automatically, and the image you build will allow Google account as well as FydeOS account sign-in.

<br>

## Setup openFyde

Now fetch the openFyde manifest, also create symlinks in the designated place to override the default one used by Chromium OS.

```bash
(outside)
$ cd r132
$ git clone https://github.com/openFyde/manifest.git openfyde/manifest -b r132-dev

$ ln -snfr openfyde/manifest .repo/local_manifests
```

Now let us start syncing:

```bash
(outside)
# Raise this number if you have a fast internet connection
$ repo sync -j8

$ cd openfyde/chromium
$ gclient sync
```

:::note
If `gclient sync` failed with the following error, you need to create `.gclient` manually and copy/paste the content of [gclient](https://github.com/openFyde/dotgclient/blob/main/dotgclient) to it.

```
Error: client not configured; see 'gclient config'
```

:::

Fetching of Chromium OS source code may take more than 30 minutes depending on your connection speed, around 100GB of data will need to be downloaded primarily from googlesource.com, it'd be helpful if you have a decent internet speed to reach Google's server.

Once `gclient sync` is completed, the chromium source folder is now fully set up.

## Build openFyde for XpressReal T3

### Create the chroot

As mentioned above, a chroot environment will be used to run the actual build process and some other related tasks. To create the chroot environment, run the commands below:

```bash
(outside)
$ cd r132
$ cros_sdk --chrome-root $HOME/r132/openfyde/chromium #absolute path needed
```

It may take around 30 minutes depending on your internet connection speed and disk i/o speed. Once finished, it will enter the chroot. The shell prompt string looks like below so it is very easy to tell whether you are currently in the chroot or not.

```
(inside)
(cr) xxx@localhost /mnt/host/source/src/scripts
```

### Build packages
Now it is time to build all software packages for the xpressreal-openfyde board.

```bash
(inside)
$ cros build-packages --board=xpressreal-openfyde --no-withautotest
# Append "--no-withautotest" to speed up the build process by skipping some tests
```

:::note
If `termina-dlc` was failed to build, add `termina-dlc` to `DLC_FACTORY_INSTALL` in `chromite/lib/dlc_allowlist.py` and retry.

:::

It may take hours depending on your processor power, your memory size, your disk speed and the quality of your internet connection. Here are some examples for you to adjust your expectations: 

- On a decent machine with 4 cores 8 threads, 16GB memory, files on regular HDD, and 100Mb broadband, it takes about 15 to 16 hours for the command to finish.
- On a Workstation-grade server with AMD Threadripper 3990x CPU with 64-core 128-thread, 128GB memory and 300Mb broadband, it takes 44 minutes for the command to finish.

### Build the disk image

After the `build-packages` command is finished successfully, you can start building the disk image.

```bash
(inside)
$ cros build-image --board xpressreal-openfyde --no-enable-rootfs-verification
# Append --no-enable_rootfs_verification flag to enable root file system read/write on the built image
```

It may take 10 to 30 minutes, mainly depending on the speed of your disk. It will be much faster on SSD than on HDD.

### Find your image

After the command finished successfully, you will have disk images generated, saved under the`/mnt/host/source/src/build/images/xpressreal-openfyde/` directory in the chroot, or `r132/src/build/images/xpressreal-openfyde` in the host OS. These two are the same directory, just bind mounted in the chroot.

Each time the build_image command gets invoked it will create a directory named similar to `R132-XXXX.XXX.<date time>-a1` under the above directory. There is a symlink named `latest` under the above directory, it always points to the image directory of the last successful build.

The disk image is usually named `chromiumos_image.bin`, under the abovementioned directory. So the full path to the latest image is

```
/mnt/host/source/src/build/images/xpressreal-openfyde/latest/chromiumos_image.bin
```

in the chroot, and

```
r132/src/build/images/xpressreal-openfyde/latest/chromiumos_image.bin
```

in the host OS.

## Boot from the image

We need to write the previously generated disk image onto a USB storage device (preferably a higher-speed USB HDD), at least 8GB capacity is required.

## More information

[Chromium OS Developer Guide](https://www.chromium.org/chromium-os/developer-library/guides/development/developer-guide/), This is the official source of how to build Chromium OS

[Getting started](/guides/getting-started/), Guide on how to setup XpressReal T3 and prepare installation media

[openFyde installation guide](/guides/openfyde-fydeos/), Step by step guide on how to install openFyde.
