import { defineNuxtPlugin } from '#app';
import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/stackoverflow-light.css';

hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('highlight', hljs);
});