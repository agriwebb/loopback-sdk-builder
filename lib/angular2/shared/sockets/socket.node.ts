/* tslint:disable */
import * as io from 'socket.io-client';
/**
 * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
 * @module SocketNode
 * @license MIT
 * @description
 * This module handle socket connections for server side rendered apps using Angular Universal,
 * it will be DI Swapped depending on the platform environment.
 * This module will be generated when the -d ng2universal flag is set.
 **/
export class SocketNode {
  /**
   * @method connect
   * @param  url URL path to connect with the server.
   * @param  options Any socket.io v1 =< valid options
   * @return  Not currently a socket.io-client for web Typings implemented.
   * @description
   * This method will return a valid socket connection.
   **/
  connect(url: any, options: any): any {
    return io(url, options);
  }
}
