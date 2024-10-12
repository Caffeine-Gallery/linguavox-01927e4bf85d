export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getTranslation' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    'postupgrade' : IDL.Func([], [], ['oneway']),
    'preupgrade' : IDL.Func([], [], ['oneway']),
    'storeTranslation' : IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
