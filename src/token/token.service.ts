import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from 'axios';

@Injectable()
export class TokenService {
  private readonly clientId = process.env.APP_ID;
  private readonly clientSecret = process.env.APP_SECRET;
  private readonly instaAppId = process.env.INSTAGRAM_APP_ID;
  private readonly instaAppSecret = process.env.INSTAGRAM_APP_SECRET
  private readonly grantType = 'client_credentials';

  constructor() {}

async getAccessToken(): Promise<string> {
  const url = `https://graph.facebook.com/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=${this.grantType}`;
  const response = await axios.get(url);
  return response.data.access_token;
}

async getInstaAccessToken(): Promise<string> {
  const insaLogin = `https://api.instagram.com/oauth/authorize?client_id=${this.instaAppId}&redirect_uri={redirect-uri}&scope=user_profile,user_media&response_type=code`;
  const response = await axios.get(insaLogin);
  console.log(response)
  return response.data.access_token;
}



  async longLivedToken(shortLivedToken: string): Promise<any> {
    const url = `https://graph.facebook.com/v23.0/oauth/access_token`;
    const params = {
      grant_type: 'fb_exchange_token',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      fb_exchange_token: shortLivedToken,
    };

    const response = await axios.get(url, { params });
    return response.data;
  }
}