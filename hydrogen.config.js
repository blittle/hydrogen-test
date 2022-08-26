import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  logger: {
  error(context, error, ...extra) {
    const url = context ? ` ${context.url}` : '';

    if (error instanceof Error) {
      console.error(`Error processing route:${url}\n${error.stack}`);
    } else {
      console.error(`Error:${url} ${error}`);
    }
  },
  },
  shopify: {
    defaultCountryCode: 'US',
    defaultLanguageCode: 'EN',
    storeDomain: Oxygen.env.SHOPIFY_STORE_DOMAIN,
    storefrontToken: Oxygen.env.SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN,
    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
