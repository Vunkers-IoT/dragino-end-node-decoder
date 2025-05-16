function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
  var batV=value/1000;//Battery,units:V
   
  value=bytes[2]<<8 | bytes[3];
  var distance=(value);//distance,units:mm

  var i_flag = bytes[4]; 
  
  value=bytes[5]<<8 | bytes[6];
  if(bytes[5] & 0x80)
  {value |= 0xFFFF0000;}
  var temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature  
  
  var s_flag = bytes[7];	
  return {
	   Node_type:"LDDS75",
       Bat:batV,
       Distance:distance,
	   Interrupt_flag:i_flag,
	   TempC_DS18B20:temp_DS18B20,
	   Sensor_flag:s_flag,
  };
}
