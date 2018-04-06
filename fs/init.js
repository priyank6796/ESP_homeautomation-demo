load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');

let led = Cfg.get('pins.led');
let button = Cfg.get('pins.button');
let topic = '/devices/' + Cfg.get('device.id') + '/events';
print('LED GPIO:', led, 'button GPIO:', button);
GPIO.set_mode(led,GPIO.MODE_OUTPUT);

let devicestate=0;


let get_control_sub_topic= function()
{   return 'zuru/devicecontrol/home_1/'+Cfg.get('device.id');   };

let get_update_status_pub_topic=function(){
  return 'zuru/updatestatus/home_1';
};

let get_connected_pub_topic=function(){
return 'zuru/onlinestatus/connectedDeviceStatus';  
};

let get_connected_message=function()
{
   return JSON.stringify(
     {device_id:Cfg.get('device.id'),status:1}
     );
};

let get_update_status_pub_message=function(data){
    let get_device_id=Cfg.get('device.id');
     return JSON.stringify({
    user_id: data.user_id,
    state: data.command,
    req_id:data.req_id, 
    device_id:get_device_id,
    switch_id:data.switch_id
  });
};

let contorldevice=function(state) 
{
devicestate=state;
print('controlled:',state);
GPIO.write(led,state);
};

MQTT.setEventHandler(function(conn, ev, edata) {
  if (ev !== 0) {print('MQTT event handler: got', ev);
  MQTT.pub(get_connected_pub_topic(),get_connected_message()); 
  }
}, null);

MQTT.sub(get_control_sub_topic(), function(conn, topic, msg) {
  let obj=JSON.parse(msg);
  DeviceControlOnline(topic,obj);
  print('Topic:', topic, 'message:', msg);
}, null);

GPIO.set_button_handler(button, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  DeviceControlLocal();
}, null);

// Monitor network connectivity.
Net.setStatusEventHandler(function(ev, arg) {
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
  }
  print('== Net event:', ev, evs);
}, null);

let DeviceControlOnline=function(topic,data)
{
  let user_id=data.user_id;
  let switch_id=data.switch_id;
  let req_id=data.req_id;
  let command=data.command;
  print(' userid -',user_id,' switch_id -',switch_id,' req_id -',req_id,' command -',command);
  contorldevice(command);
  publishUpdateStatus(topic,data);
};

let publishUpdateStatus=function(topic,data)
{
  let pub_topic=get_update_status_pub_topic();
  let pub_message=get_update_status_pub_message(data);
  let response=MQTT.pub(pub_topic,pub_message);
  print(response);
};

let DeviceControlLocal=function()
{
  contorldevice(!devicestate);
  let command=(devicestate ? 1 : 0);
  let data={
    switch_id:1,req_id:0,command:command,user_id:0
  };
  publishUpdateStatus('',data);
};


