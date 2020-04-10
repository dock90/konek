function hasType(providers, type) {
  for (const provider of providers) {
    if (provider.providerId === type) {
      return true;
    }
  }
  return false;
}

export function hasEmailLogin(fbUser) {
  return hasType(fbUser.providerData, 'password');
}

export function hasPhoneLogin(fbUser) {
  return hasType(fbUser.providerData, 'phone');
}
