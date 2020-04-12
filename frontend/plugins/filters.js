import Vue from 'vue';
import {pluralize} from './../helpers/string';

export default () => {
  Vue.filter('pluralize', pluralize);
};
