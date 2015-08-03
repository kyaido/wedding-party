function submitForm(e){
  var itemResponses = e.response.getItemResponses();
  var content = '';
  
  // 各項目
  var username = '';
  var attendance = '';
  var sex = '';
  var mail = '';
  var message = '';
  
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    if (question === 'お名前'){
      username = answer;
    }
    if (question === '出欠') {
      attendance = answer;
    }
    if (question === '性別'){
      sex = answer;
    }
    if (question === 'メールアドレス') {
      mail = answer;
    }
    if (question === 'メッセージ'){
      message = answer;
    }
    content += question + '：' + answer + '\n';
  }
  
  // 管理者用メール送信
  var address = 'kamehameha1985@gmail.com';
  var title = '【自動送信】フォームが送信されました';
  var content = '以下の内容でフォームが送信されました。\n\n' + content;
  GmailApp.sendEmail(address, title, content);
  
  // 回答者用メール送信
  var title2 = '【自動返信】海道・佐藤ウェディングパーティ';
  var content2 = username + '様\n'
                 + '\n'
                 + '出欠登録ありがとうございます！\n'
                 + '出欠の変更などありましたら、お気軽に新郎・新婦までご連絡くださいませ\n'
                 + '\n'
                 + 'お名前：' + username + '\n'
                 + '出欠：'   + attendance + '\n'
                 + '\n'
                 + '▼パーティ詳細はこちらをご覧ください\n'
                 + 'https://xxx\n';
  GmailApp.sendEmail(mail, title2, content2);
}

// TODO
// 送信用メールアドレスを取得
// 送信者の名前を設定したい→専用のアドレスとれば別にいいかも
// 出席か欠席かで内容わける？