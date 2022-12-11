import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'tk-bookmark-app-extension',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    
    {
      type: 'www',
      copy: [
        { src: '../node_modules/@shoelace-style/shoelace/dist',
          //src: '../node_modules/tk-bookmark-components/www/shoelace',
          dest: 'shoelace'
        },
        { src: '../node_modules/tk-bookmark-components/',
          dest: 'tk-bookmark-components'
        },
      ]
    },
  ],
};
