import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getTranslation' : ActorMethod<[string], [] | [string]>,
  'postupgrade' : ActorMethod<[], undefined>,
  'preupgrade' : ActorMethod<[], undefined>,
  'storeTranslation' : ActorMethod<[string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
