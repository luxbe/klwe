import * as Kustom from 'kustom';
import { HasChildren } from './interfaces';

declare module 'kustom' {
  interface Stack extends Kustom.Stack, HasChildren {}
  interface Overlap extends Kustom.Overlap, HasChildren {}
}
