import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ConversationService {
  constructor() {}

  async getInstagramConversations(): Promise<any> {
    let accessToken = 'IGAAKM1uAcsZCpBZAE54OWhyUG5COVhGOExtVUhuNVNxWF9LMTM0b1NWb0VWQWE2N2ZACUzliUW1aN2szOUVUZAzA0aUtQODI1MGZARQV9CS3pPY2NmYmFsRlFJaXJWSUR0ZAmc3alJYTUNZAY1JfTVhHbzRyNWVpWC1FUjZApYnZAKYnQ5bwZDZD'
    const url = `https://graph.instagram.com/v23.0/17841436956163613/conversations?platform=instagram&access_token=${accessToken}`;

    // const response = await this.httpService.get(url).toPromise();
    const response = await axios.get(url);
    return response.data;
  }

  async getConversationId(): Promise<any> {
        let accessToken = 'IGAAKM1uAcsZCpBZAE54OWhyUG5COVhGOExtVUhuNVNxWF9LMTM0b1NWb0VWQWE2N2ZACUzliUW1aN2szOUVUZAzA0aUtQODI1MGZARQV9CS3pPY2NmYmFsRlFJaXJWSUR0ZAmc3alJYTUNZAY1JfTVhHbzRyNWVpWC1FUjZApYnZAKYnQ5bwZDZD';
        
    const url = `https://graph.instagram.com/v23.0/aWdfZAG06MzQwMjgyMzY2ODQxNzEwMzAxMjQ0Mjc2MjIzNzEzOTM2MzE4ODQ5&fields=messages&access_token=${accessToken}`
    const response = await axios.get(url);
    return response.data;
  }


}