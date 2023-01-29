package com.veet.core.api.service.mail;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sendinblue.ApiClient;
import sendinblue.ApiException;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailSender;
import sibModel.SendSmtpEmailTo;

@Service
public class SendinblueService {

  private ApiClient defaultClient;
  private TransactionalEmailsApi emailApi = new TransactionalEmailsApi();

  public SendinblueService(@Value("${sendinblue.api-key}") String sbApiKey) {
    this.defaultClient = Configuration.getDefaultApiClient();
    ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
    apiKey.setApiKey(sbApiKey);
  }

  public void sendEmail(String to, String from, String subject, String htmlTemplate) throws ApiException {
    SendSmtpEmail sender = new SendSmtpEmail();
    sender.setSender(new SendSmtpEmailSender().email(from));
    sender.setTo(List.of(new SendSmtpEmailTo().email(to)));
    sender.setSubject(subject);
    sender.setHtmlContent(htmlTemplate);
    emailApi.sendTransacEmail(sender);
  }
}
