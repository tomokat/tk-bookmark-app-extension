import { Component, h } from '@stencil/core';

@Component({
  tag: 'tk-bookmark-app-extension-root',
  styleUrl: 'tk-bookmark-app-extension-root.css',
  shadow: false,
})
export class TkBookmarkAppExtensionRoot {

  render() {
    return (
      <div>
        <sl-input></sl-input>
      </div>
    );
  }

}
