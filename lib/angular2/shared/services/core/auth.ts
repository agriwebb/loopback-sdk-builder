/* tslint:disable */
declare var Object: any;
import { Inject, Injectable } from '@angular/core';
import { SDKToken } from '../../models/BaseModels';
import { InternalStorage } from '../../storage/storage.swaps';
/**
 * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
 * @module SocketConnection
 * @license MIT
 * @description
 * This module handle socket connections and return singleton instances for each
 * connection, it will use the SDK Socket Driver Available currently supporting
 * Angular 2 for web, NativeScript 2 and Angular Universal.
 **/
@Injectable()
export class LoopBackAuth {
  /**
   * @type {SDKToken}
   **/
  private token: SDKToken = new SDKToken();
  /**
   * @type {string}
   **/
  protected prefix: string = '$LoopBackSDK$';
  /**
   * @method constructor
   * @param  storage Internal Storage Driver
   * @description
   * The constructor will initialize the token loading data from storage
   **/
  constructor(@Inject(InternalStorage) protected storage: InternalStorage) {
    this.token.id = this.load('id');
    this.token.user = this.load('user');
    this.token.userId = this.load('userId');
    this.token.created = this.load('created');
    this.token.ttl = this.load('ttl');
    this.token.rememberMe = this.load('rememberMe');
  }
  /**
   * @method setRememberMe
   * @param  value Flag to remember credentials
   * @return
   * @description
   * This method will set a flag in order to remember the current credentials
   **/
  public setRememberMe(value: boolean): void {
    this.token.rememberMe = value;
  }
  /**
   * @method setUser
   * @param  user Any type of user model
   * @return
   * @description
   * This method will update the user information and persist it if the
   * rememberMe flag is set.
   **/
  public setUser(user: any) {
    this.token.user = user;
    this.save();
  }
  /**
   * @method setToken
   * @param  token SDKToken or casted AccessToken instance
   * @return
   * @description
   * This method will set a flag in order to remember the current credentials
   **/
  public setToken(token: SDKToken): void {
    this.token = Object.assign({}, this.token, token);
    this.save();
  }
  /**
   * @method getToken
   * @return
   * @description
   * This method will set a flag in order to remember the current credentials.
   **/
  public getToken(): SDKToken {
    return <SDKToken>this.token;
  }
  /**
   * @method getAccessTokenId
   * @return
   * @description
   * This method will return the actual token string, not the object instance.
   **/
  public getAccessTokenId(): string {
    return this.token.id;
  }
  /**
   * @method getCurrentUserId
   * @return
   * @description
   * This method will return the current user id, it can be number or string.
   **/
  public getCurrentUserId(): any {
    return this.token.userId;
  }
  /**
   * @method getCurrentUserData
   * @return
   * @description
   * This method will return the current user instance.
   **/
  public getCurrentUserData(): any {
    return typeof this.token.user === 'string'
      ? JSON.parse(this.token.user)
      : this.token.user;
  }
  /**
   * @method save
   * @return  Whether or not the information was saved
   * @description
   * This method will save in either local storage or cookies the current credentials.
   * But only if rememberMe is enabled.
   **/
  public save(): boolean {
    let today = new Date();
    let expires = new Date(today.getTime() + this.token.ttl * 1000);
    this.persist('id', this.token.id, expires);
    this.persist('user', this.token.user, expires);
    this.persist('userId', this.token.userId, expires);
    this.persist('created', this.token.created, expires);
    this.persist('ttl', this.token.ttl, expires);
    this.persist('rememberMe', this.token.rememberMe, expires);
    return true;
  }
  /**
   * @method load
   * @param  prop Property name
   * @return  Any information persisted in storage
   * @description
   * This method will load either from local storage or cookies the provided property.
   **/
  protected load(prop: string): any {
    return this.storage.get(`${this.prefix}${prop}`);
  }
  /**
   * @method clear
   * @return
   * @description
   * This method will clear cookies or the local storage.
   **/
  public clear(): void {
    Object.keys(this.token).forEach((prop: string) =>
      this.storage.remove(`${this.prefix}${prop}`)
    );
    this.token = new SDKToken();
  }
  /**
   * @method persist
   * @return
   * @description
   * This method saves values to storage
   **/
  protected persist(prop: string, value: any, expires?: Date): void {
    try {
      this.storage.set(
        `${this.prefix}${prop}`,
        typeof value === 'object' ? JSON.stringify(value) : value,
        this.token.rememberMe ? expires : null
      );
    } catch (err) {
      console.error('Cannot access local/session storage:', err);
    }
  }
}
