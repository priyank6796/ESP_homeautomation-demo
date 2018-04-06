# ESP32 Homeautomation boilerplate using mongoose-os

## Overview

This is home-automation project demo using mqtt client to control your devices connected with your esp8266 device. Using this demo software, you can build your own custom solution for home-automation product.

## How to install this app

- Before doing anything first, You need to update "MoS" tool which is provided by mongoose os to build and upload firmware to Esp8266.

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
