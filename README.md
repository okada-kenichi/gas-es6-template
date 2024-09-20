
# Google Apps Script モダン開発テンプレート

このテンプレートは、**Google Apps Script (GAS)** で **ES6+** の JavaScript 機能を使って開発するためのモダンな開発環境を提供します。**Babel** でのトランスパイルと **Clasp** を利用して GAS プロジェクトの管理やデプロイを簡単に行えます。  
[簡易手順まで読み飛ばす](#簡易手順)
## 特徴

- `const` や `let`、アロー関数、テンプレートリテラルなどの **モダンな JavaScript (ES6+)** を使ってコードを書くことができます。
- **Babel** を使用してコードを **ES5** に自動トランスパイルし、Google Apps Script 環境で動作させます。
- **Clasp** により、ローカルのエディタが使えたりGitによる管理ができます。
- **Clasp** を使って、簡単にコードを Google Apps Script にデプロイできます。
- JSではないのでポリフィルは使用しません。
- ファイルの変更を監視して自動的にトランスパイルする機能もあります。

## 必要なもの

- Node.js (npm)
- Clasp (`npm install -g @google/clasp`)ログインしておく```clasp login```/```clasp logout```
- Google アカウント（Google Apps Script のアクセス権があるもの）

## 初期設定

以下の手順に従って、このテンプレートを使い始めてください。

### 1. GitHub 上でテンプレートからリポジトリを作成

GitHub 上のテンプレートリポジトリ（当リポジトリ）にアクセスし、「**Use this template**」をクリック。  
新しいリポジトリ名を設定して、自分のリポジトリとして作成します。

### 2. リポジトリをクローンする

作成したリポジトリをクローンします。

```bash
git clone https://github.com/your-username/your-gas-project.git
cd your-gas-project
```

### 3. 依存関係をインストールする

```bash
npm install
```

これで、Babel、Clasp など必要なパッケージがインストールされます。

### 4. Google Apps Script プロジェクトを作成またはクローン

#### オプション1: 新しいプロジェクトを作成

```bash
clasp create
```
プロジェクト名は、指定しなければ自動的に作業ディレクトリの名前になります。GitHubのリポジトリの場合、リポジトリ名がそのまま使用されます。  
あるいはオプションにより、プロジェクト名を指定したりプロジェクトのタイプを指定することもできます。
```bash
clasp create --title "Your Project Name" --type standalone
```

これにより、新しい Google Apps Script プロジェクトが作成され、`clasp.json` ファイルが自動生成されます。

#### オプション2: 既存のプロジェクトにリンク

既に Google Apps Script プロジェクトがある場合、そのプロジェクトにリンクするために次のコマンドを実行します。

```bash
clasp clone <your-script-id>
```

### 5. `clasp.json` を設定する

プロジェクトが作成またはクローンされたら、**`clasp.json`** に **`"rootDir": "dist"`** を記述する必要がありますが、update-clasp.jsによりbuild時に自動で行われます。

```json
{
  "scriptId": "your-script-id-here",
  "rootDir": "dist"
}
```

これにより、`dist` フォルダにトランスパイルされたファイルだけが Google Apps Script にデプロイされます。  
またプロジェクトのルートに生成された```appsscript.json```は、buildの際にタイムゾーンを日本に変更し、distフォルダにコピーされます。これらは自動で行われます。
```
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER"
}
```
### 6. コードを書く

`src` フォルダ内にある **ES6+** の JavaScript ファイルを編集します。たとえば、`src/code.js` を編集して次のようなコードを追加します。

```javascript
// 例
const greet = (name) => `Hello, ${name}!`;
Logger.log(greet('Google Apps Script'));
```

### 7. コードをビルドする

以下のコマンドを実行して、**Babel** で **ES6+** のコードを **ES5** にトランスパイルします。

```bash
npm run build
```

これにより、`src` フォルダのコードが `dist` フォルダにトランスパイルされます。

### 8. Google Apps Script にデプロイする

コードをトランスパイルしたら、Clasp を使って Google Apps Script プロジェクトにデプロイします。

```bash
npm run push
```

これで、トランスパイルされたコードが Google Apps Script にプッシュされます。  
`? Manifest file has been updated. Do you want to push and overwrite?`というメッセージが出ることがありますが、Google Apps Script プロジェクトに最新のファイルを上書きするかどうかを確認しています。Yes を選択することで、ローカルの appsscript.json などのファイルがリモートに上書きされます。

### 9. オプション: ファイル変更の監視

ファイルが変更されたときに自動的にトランスパイルを行いたい場合、次のコマンドを実行してください。

```bash
npm run watch
```
終わる時は`Command + C`  
これにより、`src` フォルダのファイルが監視され、変更があるたびに自動的にトランスパイルが実行されます。

### 10. GoogleDriveのエディターからプロジェクトを開く  
```
clasp open
```  
このコマンドでブラウザからGASのエディターを開けます。  

## フォルダ構成

```plaintext
gas-es6-template/
├── src/                # ES6+ の JavaScript コードを書く場所
│   └── code.js         # 例としてのコードファイル
├── dist/               # Babel によってトランスパイルされた ES5 コード
├── package.json        # Node.js プロジェクトファイル（ビルドとデプロイのスクリプトを含む）
├── babel.config.json   # Babel 設定ファイル
├── appsscript.json     # GAS 設定ファイル
├── clasp.json          # Clasp 設定ファイル（Git で除外されます）
├── update-clasp.js     # .clasp.jsonに記述されているrootDirにdistをセットする自作関数
└── .gitignore          # dist、node_modules、clasp.json を除外します
```

## .gitignore

この `.gitignore` ファイルは以下の項目を除外するように設定されています。

- **`node_modules/`**: インストールされたパッケージはコミットされません。
- **`dist/`**: トランスパイルされたコードはコミットされません。
- **`clasp.json`**: `scriptId` などのプロジェクト固有情報はコミットされません。  

## 簡易手順
### 1. **GitHub 上でテンプレートを使ってリポジトリを作成**
  - 当テンプレートリポジトリにて、「Use this template」をクリック。
  - 新しいリポジトリ名を設定し、自分のリポジトリとして作成。


### 2. GitHub 上でテンプレートを使ってリポジトリを作成
GitHub テンプレートからリポジトリを作成し、クローンします。
```bash
git clone https://github.com/your-username/your-gas-project.git
cd your-gas-project
```

### 3. 依存関係をインストール
```bash
npm install
```

### 4. Google Apps Script プロジェクトを作成
```bash
clasp create --type standalone
```

### 5. ビルド
```bash
npm run build
```

### 6. デプロイ
```bash
npm run push
```

### 7. ブラウザで開く
```bash
clasp open
```

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。自由にご利用いただけます。  
©2024 okada-kenichi  
[https://opensource.org/licenses/mit-license.php](https://opensource.org/licenses/mit-license.php)
