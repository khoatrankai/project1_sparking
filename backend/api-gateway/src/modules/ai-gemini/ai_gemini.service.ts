import {
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIGeminiService {
  private genAI: GoogleGenerativeAI;
  constructor(
    
    private readonly configService: ConfigService,
  ) {
    this.genAI = new GoogleGenerativeAI(this.configService.get<string>('KEY_GEMINI'));
  }
  getHello(){
    return "";
  }


  async analystTextCustomer(prompt:string){
    try{
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const textOK = `Bạn hãy lấy ra các thông tin như số cccd, họ và tên,ngày sinh,giới tính,quê quán,nơi thường trú và chỉ trả lời theo đúng như này không cần nói gì thêm : (số cccd)#(họ và tên)#(ngày sinh)#(giới tính)#(quê quán)#(nơi thường trú) . Đây là dữ kiện: '${prompt}'`
      const result = await model.generateContent(textOK);
      const res = result.response.text();
      const datas = res.split("#")
      return{
        statusCode:HttpStatus.OK,
        data:{
          id:datas?.[0],
          full_name:datas?.[1],
          date_of_birth:datas?.[2],
          sex:datas?.[3],
          place_of_origin:datas?.[4],
          place_of_residence:datas?.[5]
        }
       
      }
    }catch{
      return{
        statusCode:HttpStatus.BAD_REQUEST,
        message:"not found"
       
      }
    }
    
  }

  

}
