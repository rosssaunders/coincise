# Data Compression

**Source:** [Data Compression](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Data Compression

Only when the market data is returned after subscription, the remote service
will compress the data and return it to the client. The remote service returns
data in two formats, Binary format and Text format. When the binary format is
returned, the data has been compressed by the remote service and the client
needs to decompress it.

#### Compression Introduction

zlib is a library for data compression, developed by Jean-loup Gailly and Mark
Adler. The first version (v0.9) was published on May 1, 1995. zlib uses the
abstract DEFLATE algorithm, originally written for the libpng library, and later
generally used by many software. This library is free.
[Official link http://zlib.net/](http://zlib.net/)

#### Decompression Example

For more and more complete programming codes, please refer to the
[Quick Start API](/en/quick/#python-quick-start)

> Python

`import zlib  def inflate(data):     decompress = zlib.decompressobj(             -zlib.MAX_WBITS     )     inflated = decompress.decompress(data)     inflated += decompress.flush()     return inflated.decode('UTF-8')`

> Nodejs

`const zlib = require('zlib');  zlib.inflateRawSync(data);`

> Golang

`import (     "compress/flate" )  func zipDecode(in []byte) ([]byte, error) {     reader := flate.NewReader(bytes.NewReader(in))     defer reader.Close()      return ioutil.ReadAll(reader) }  string(zipDecode(data))`

> php

`@link https://php.net/manual/en/function.gzinflate.php  gzinflate($data)`

> Java

`import java.util.zip.*;  public class StringCompressUtil {      private static String uncompress(ByteBuf buf) {         try {             byte[] temp = new byte[buf.readableBytes()];             ByteBufInputStream bis = new ByteBufInputStream(buf);             bis.read(temp);             bis.close();             Inflater decompresser = new Inflater(true);             decompresser.setInput(temp, 0, temp.length);             StringBuilder sb = new StringBuilder();             byte[] result = new byte[1024];             while (!decompresser.finished()) {                 int resultLength = decompresser.inflate(result);                 sb.append(new String(result, 0, resultLength, "UTF-8"));             }             decompresser.end();             return sb.toString();         }catch (Exception e) {             e.printStackTrace();         }         return "";     }      public static String decode(ByteBuf content){         byte[] bytes = new byte[content.readableBytes()];         content.readBytes(bytes);         ByteBuf byteBuf = Unpooled.wrappedBuffer(bytes);         String str = uncompress(byteBuf);         return str;     }  }  StringCompressUtil.decode(data)`
