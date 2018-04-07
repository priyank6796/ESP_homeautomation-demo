# Homeautomation boilerplate using Mongoose OS - IoT Firmware Development Framework

## Overview

This is home-automation system demo using mqtt client to control your devices connected with your ESP device. Using this demo software, You can build your own custom solution for home-automation product.

## How to install this application

- Before doing anything first, You need to update "MoS" tool which is provided by Mongoose OS to build and upload firmware to ESP device..

### Command to update mos tool 

```sh
$ mos update
```

### Command to build firmware
```sh
$ mos build --arch esp32
```
Note : In case of esp8266, Replace "esp8266" with "esp32" in above command.

### Command to Upload firmware to ESP device
```sh
$ mos flash --port COM9
```
Note - you need to specific port on which you device is connected. 

### Use following command to get UI console for your esp device

```sh
$ mos
```

#### For more information about  [Mongoose OS](https://github.com/user/repo/blob/branch/other_file.md)


#### Multiple IDE Option Available

- [Use Visual studio code as IDE](https://mongoose-os.com/docs/reference/ide.html)
- [Use MoS Tool as IDE](https://mongoose-os.com/docs/quickstart/setup.html)