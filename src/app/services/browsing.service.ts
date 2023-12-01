import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { textToSpeechAndPlay } from './textToSpeech';

@Injectable({
  providedIn: 'root'
})

export class BrowsingService {
  private ipcRenderer: IpcRenderer;

  url = 'https://google.fr';
  canGoBack =false;
  canGoForward = false;

  toogleDevTool() {
    this.ipcRenderer.invoke('toogle-dev-tool');
  }

  goBack() {
    this.ipcRenderer.invoke('go-back')
    this.updateHistory();
  }

  goForward() {
    this.ipcRenderer.invoke('go-forward')
    this.updateHistory();
  }

  refresh() {
    this.ipcRenderer.invoke('refresh');
  }

  goToPage(url: string) {
    this.ipcRenderer.invoke('go-to-page', url)
    .then(() =>this.updateHistory());
  }

  getTheSourceCode() {
    this.ipcRenderer.invoke('get-page-source')
    .then((page) => {
      console.log(page);
      textToSpeechAndPlay(page);
    });
  }

//  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

  setToCurrentUrl() {
    this.ipcRenderer.invoke('current-url')
    .then((url)=>{
      this.url = url;
    });
  }

  

  updateHistory(){

    this.setToCurrentUrl();

    this.ipcRenderer.invoke('can-go-back')
    .then((canGoBack) => this.canGoBack = canGoBack);

    this.ipcRenderer.invoke('can-go-forward')
    .then((canGoForward) => this.canGoForward = canGoForward);
  }

  constructor() {
    if (window.require){
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }else{
      // Seulement pour les tests en dehors d'electron
      const ipc = {} as IpcRenderer;
      this.ipcRenderer = ipc;
    }
  }
}