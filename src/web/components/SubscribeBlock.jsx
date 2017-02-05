
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';

const mailchimpForm = `<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
  /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
     We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="//firebaseapp.us13.list-manage.com/subscribe/post?u=c942beec15922e2cda7205097&amp;id=32bef409ee" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
  <h2>Подписаться на обновления калькулятора</h2>
<div class="indicates-required"><span class="asterisk">*</span> обязательное поле</div>
<div class="mc-field-group">
  <label for="mce-EMAIL">Адрес email  <span class="asterisk">*</span>
</label>
  <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
</div>
  <div id="mce-responses" class="clear">
    <div class="response" id="mce-error-response" style="display:none"></div>
    <div class="response" id="mce-success-response" style="display:none"></div>
  </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_c942beec15922e2cda7205097_32bef409ee" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Подписаться" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<!--End mc_embed_signup-->`;

export class SubscribeBlock extends React.Component {
    constructor(props) {
    super(props);
    // console.log('props:', props);
  }
  
//<!-- /1026214/podo_web_btm -->
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: mailchimpForm}}>
      </div>
  )}
}


