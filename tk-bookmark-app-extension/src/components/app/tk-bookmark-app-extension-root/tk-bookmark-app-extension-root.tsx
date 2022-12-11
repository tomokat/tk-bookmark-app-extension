import { Component, h, Listen, State } from '@stencil/core';

import state from '../../../store/tk-bookmark-app-extension-store';

@Component({
  tag: 'tk-bookmark-app-extension-root',
  styleUrl: 'tk-bookmark-app-extension-root.css',
  shadow: false,
})
export class TkBookmarkAppExtensionRoot {

  @State() loadedTags = false;
  @State() loadedPageData = false;

  pageUrl: string;
  pageTitle: string;
  
  @State() bookmark;

  pageData;
  
  existingTags = [];

  @Listen('addBookmarkSuccess')
  @Listen('closeAddBookmark')
  handleCloseAddBookmark() {
    window.close();
  }

  async componentWillLoad() {
    this.getLabelData();
    this.getPageData();
  }

  componentWillRender() {
    this.bookmark = {...this.pageData};
  }

  getDataUrl() {
    return `${state.bookmarkApi}/label/user/guest`;
  }

  async getLabelData() {
    let response = await fetch(this.getDataUrl());
    let json = await response.json();
    this.existingTags = [...json.sort((a,b) => a.caption.toLowerCase() > b.caption.toLowerCase() ? 1: -1)];
    state.labels = this.existingTags;
    this.loadedTags = true;
  }

  getPageData() {
    if(chrome.tabs) {
      console.log(`a trying to get pageData - at least chrome.tabs is defined`);
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
        if(tabs[0]) {
          console.log(`got active tab info ${tabs[0].url}`);
          this.pageTitle = tabs[0].title;
          let tabUrl = tabs[0].url;
          this.pageUrl = tabUrl;
          this.pageData = {
            title: tabs[0].title,
            url: tabs[0].url,
            notes: '',
            user: ''
          };
          this.loadedPageData = true;
        }
      });
    }
  }

  render() {
    if(!this.loadedTags || !this.loadedPageData || !this.bookmark) {
      return;
    } else {
      console.log(`about to render bookmark ${JSON.stringify(this.bookmark)}`)
    }

    return (
      <div>
        <sl-button href={state.baseUrl} target="_blank">Open bookmark app</sl-button>
        <tk-add-or-edit-bookmark hideNextButton={true} forNewBookmark={true} existingTags={this.existingTags}
          bookmark={this.bookmark} overrideState={state}></tk-add-or-edit-bookmark>
      </div>
    );
  }

}
