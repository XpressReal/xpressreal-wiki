--- 
title: XpressReal + FydeSign User Guide 
description: Guide on on how to use the XpressReal + FydeSign solution.
---
# XpressReal + FydeSign User Guide

Welcome to your smart signage journey! With **XpressReal**, a powerful SBC device, and **FydeSign**, FydeOS’s cloud-based media management platform, you can deploy, control, and update multimedia displays remotely—fast and effortlessly.

Whether it's for retail stores, campuses, buildings, or government offices, this guide walks you through every step to get your XpressReal device enrolled and playing content in no time.

---

## I. Device Enrollment Process

### 🚀 Step 1: Prepare for Enrollment

Have the following ready:

- An enterprise [FydeOS Management Cloud](https://admin.fydeos.io/) account  
  - If you don’t have one, You only need to fill out a form to [try FydeOS Enterprise Solution](https://fydeos.io/enterprise-solution/request-demo/) for free.
- An XpressReal device and a monitor  
![XpressReal Device](https://cdn-web.fydeos.io/Xpressreal_3f6cac8805.jpg)
- A Zero-Touch Enrolment (ZTE) system image generated from FydeOS Management Cloud ([How to Generate a ZTE Image](https://enterprise.fydeos.io/wiki/Getting-Started/how_to_create_a_zte_image)) or a standard image downloaded from the official site  
- A blank SD card (≥ 8 GB recommended)



### 💾 Step 2: Flash the Image to SD Card

Use **[BalenaEtcher](https://www.balena.io/etcher/)**, **[Rufus (Windows)](https://rufus.ie/)**, or a similar tool to flash the ZTE image to the SD card:

1. Launch the flashing tool.  
2. Select the downloaded image file.  
3. Insert the SD card and choose it as the target device.  
4. Click **Start Flashing** and wait until it finishes.

See [Getting Started](https://wiki.xpressreal.io/guides/getting-started/) for detailed instructions.



### 🖥️ Step 3: Boot and Install the System

1. Insert the flashed SD card into the XpressReal device.  
2. Power on the device and enter the installation wizard.  
3. Follow the prompts to install the system onto the device’s internal storage.  
4. After installation, remove the SD card and reboot the device.

See [Setup openFyde](https://wiki.xpressreal.io/guides/openfyde/) for detailed instructions.



### 🧰 Step 4: Complete OOBE Setup

On first boot, the device enters the **OOBE (Out-of-Box Experience)** wizard. Follow the on-screen instructions to complete initial setup.

See [Setup openFyde](https://wiki.xpressreal.io/guides/openfyde/) for detailed instructions.



### 🔐 Step 5: Enroll the Device

- If you used a **ZTE image**, the device enrolls into your enterprise automatically during OOBE—no manual action required.
- If you are enrolling the device manually using a **standard image**, please refer to the wiki article: [Enrol FydeOS device](https://enterprise.fydeos.io/wiki/Getting-Started/enrol_fydeos_device).

Upon successful enrolment, you will see a confirmation message at the top of the settings page indicating that your device is managed by your enterprise.

---

## II. Automatic FydeSign Startup on Kiosk Devices

### 1. Default Behavior

After enrollment, the device is placed in the same organizational unit (default OU) as the account used.



### 2. FydeSign auto-lunched Logic

The device must be in the organizational unit where the auto-launch app is configured in order to automatically start the Kiosk app.

- If the device is not in the organizational unit where the auto-launch app is configured, you need to move the device to that organizational unit. follow these steps to move the device manually:

1. Sign in to FydeOS Management Cloud.  
2. Go to **Devices › Devices**.  
3. Click the device to open the details page, then click "Move To” under the Operation section.
![Device Operation](https://cdn-web.fydeos.com/Device_Operation_989c8b2811.png)
4. Select the target OU and confirm.  
5. **Reboot the device or wait for a moment** to apply the OU change and auto-lunched settings.  
 

If FydeSign is already set as the auto-launch app for this OU, and the device belongs to the same OU, the screen will appear in **FydeSign › Screens**.


---

## III. FydeSign Configuration and Usage

### 🎯 Step 1： Set FydeSign as the auto-lunched App

  1. Sign in to [FydeOS Management Cloud](https://admin.fydeos.io).  
  2. Navigate to **Kiosk › Apps**.  
  3. In the desired OU, set **FydeSign** as the auto-lunched application.

  <video controls width="100%" height="auto">
    <source src="https://cdn-web.fydeos.io/Set_auto_launch_app_280453b272.mp4" type="video/mp4">
  </video>



### 🖼️ Step 2： Upload Media Assets

1. Go to **FydeSign › Files**.  
2. Click **Upload File** and select images, videos, or other media files.




### 🎞️ Step 3： Create a Playlist

1. Open **FydeSign › Playlists**.  
2. Create a new playlist and add the uploaded media.  
3. Configure the playback schedule: dates, time slots, order, etc.

<video controls width="100%" height="auto">
  <source src="https://cdn-web.fydeos.io/Set_media_schedule_37b69c4e07.mp4" type="video/mp4">
</video>


### 🔗 Step 4： Bind a Playlist to Devices

Bind a playlist to the desired device using either method below:

- **Method 1 (from the Screens page)**:  
  - Go to **FydeSign › Screens**.  
  - Click **Action › Bind Playlist** for the target screen.  
  - Choose the playlist and confirm.

- **Method 2 (from the Playlists page)**:  
  - Go to **FydeSign › Playlists**.  
  - Click **Assign to Screens** for the target playlist.  
  - Select the devices and save.

> ⏱️ Playback may take a few moments to update on device



### 🚪 Step 5： Exit the FydeSign App (Kiosk Mode)

When FydeSign runs automatically in kiosk mode, you can exit or shut down as follows:

1. Press and hold the power button for about 1 second.  
2. A control menu appears with the options:
   - **Shut Down** – power off the device  
   - **Sign Out** – exit the current app and return to the system  