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
    if (question === 'メールアドレス（任意）') {
      mail = answer;
    }
    if (question === 'メッセージ（任意）'){
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
  if(mail !== '') {
    var title2 = '【自動返信】海道・佐藤ウェディングパーティー';
    var content2 = username + '様\n'
                   + '\n'
                   + '出欠登録ありがとうございます！\n'
                   + '出欠の変更などありましたら、お気軽に海道・佐藤までご連絡ください！\n'
                   + '\n'
                   + 'お名前：' + username + '\n'
                   + '出欠：'   + attendance + '\n'
                   + '\n'
                   + '▼パーティー詳細はこちらをご覧ください\n'
                   + 'https://kyaido.github.io/wedding-party/\n'
                   + '\n'
                   + 'よろしくお願いします◎\n'
                   + '\n'
                   + '浩介＆あゆみ\n';
    GmailApp.sendEmail(mail, title2, content2, { from: 'wedding.party.10.17@gmail.com' });
  }
}
