import { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';

export default function Providers({chidren} : {children:PropsWithChildren}) {
    return (
      <RecoilRoot>{children}</RecoilRoot>
    )
}
  