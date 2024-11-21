'use server';

import { signOut } from '../../utils/config/auth.options';

export const logout = async() => {

  await signOut();
}