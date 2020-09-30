package com.graduation.project.util;

import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;

public class ImageUtil {
    public static String getInputStream(String addr){
        ByteArrayOutputStream baos = new ByteArrayOutputStream();//io流
        BASE64Encoder encoder = new BASE64Encoder();
        try {
            String imgPath = addr;
            File file=new File(imgPath);
            BufferedImage bufferedImage = ImageIO.read(file);
            ImageIO.write(bufferedImage, "png", baos);//写入流中
            byte[] bytes = baos.toByteArray();//转换成字节
            String png_base64 =  encoder.encodeBuffer(bytes);//转换成base64串
            png_base64 = png_base64.replaceAll("\n", "").replaceAll("\r", "");//删除 \r\n
            return png_base64;
        } catch (Exception e) {

        }
        return null;
    }
}
