import React, { useState, useContext } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./mypage.css";
import Modal from 'react-modal';
// import User from '../../../../backend/models/User';
import { AuthContext } from '../../context/AuthContext';

Modal.setAppElement('#root');
// モーダルをアプリのルートに設定

export default function MyPage({user}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [selectedTab, setSelectedTab] = useState(0); // 編集するタブのインデックス
  const tabTitles = ["プロフィール", "できること", "キャリア・経歴"]; // タ

  const { user: currentUser } = useContext(AuthContext);
  const openModal = (tabIndex) => {
    setSelectedTab(tabIndex);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveContent = () => {
    // ここで編集内容を保存する処理を実装
    // 例: APIを呼び出してサーバーに保存
    console.log(`保存する内容: ${editContent} (タブ: ${tabTitles[selectedTab]})`);
    // console.log(`保存する内容: ${editContent}`);
    closeModal();
  };

  return (
    <>
    <div className="myPage">
      <div className='editButtonWrap'>
      {tabTitles.map((title, index) => (
            <button key={index} className='editButton' onClick={() => openModal(index)}>編集: {title}</button>
      ))}
      </div>
      <Tabs>
      <TabList className="tabTitle">
      {tabTitles.map((title, index) => (
              <Tab key={index}>{title}</Tab>
            ))}

        {/* <Tab>プロフィール</Tab>
        <Tab>できること</Tab>
        <Tab>相談したいこと</Tab> */}
      </TabList>

      <TabPanel className="tabContent ">
        <h1>プロフィール</h1>
        <p className='tabContentDetail'>学歴
          1998年3月　神奈川県立湘南高等学校 卒業
          2004年3月　東京大学 医学部 医学科 卒業
          資格
          医師免許
          内科専門医
          応急手当指導員
          英語：医学論文の読解・執筆が可能（TOEFL iBT 95点）
          趣味・特技
          ヨガ：週3回の練習を続けており、健康管理に役立てています。
          料理：特に健康に良い和食を作ることを楽しんでいます。
          </p>
      </TabPanel>
      <TabPanel>
        <h1>できること</h1>
        <p className='tabContentDetail'>{currentUser.background}</p>
      </TabPanel>
      <TabPanel>
        <h1>相談したいこと</h1>
        <p className='tabContentDetail'>患者データの一元管理の課題：現在、患者情報、診療記録、検査結果などが異なるシステムに分散して保存されており、必要な情報を迅速に照合・活用するのが難しい状況です。これにより、診療の効率が落ち、患者サービスの質にも影響が出ています。

          予約システムの不備：患者からの予約受付、スケジューリングの調整が手作業に頼っているため、過剰予約やダブルブッキングが発生しやすく、スタッフの負担も大きいです。また、患者満足度の低下にもつながっています。

          遠隔医療の導入と拡大の必要性：地域によっては医療アクセスが限られており、特に高齢者や障害を持つ患者にとって、定期的な診察や健康相談が困難な場合があります。遠隔医療の導入と拡大によって、これらの問題を解決し、より多くの患者に質の高い医療サービスを提供したいと考えています。

          医療スタッフの教育と継続学習の支援：医療技術の進歩は速く、医療スタッフが最新の知識や技術を習得し、維持することが重要です。しかし、忙しい業務の中で継続的な教育やトレーニングを実施するのは困難です。効率的な研修プログラムや学習管理システムが必要です。

          これらの課題に対して、貴社が提供できるソリューションがあれば、詳細をお聞かせください。特に、患者データの統合管理システム、効率的な予約システム、遠隔医療サービスの提供、オンラインでの研修プログラムなど、具体的な提案を期待しております。

          私たちは、これらの課題を解決することで、より良い医療サービスの提供と医療スタッフの働きやすい環境の実現を目指しています。貴社の技術やサービスによる支援を検討することができれば幸いです。</p>
      </TabPanel>
    </Tabs>
    </div>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="編集モーダル"
        className="contentModal"
        overlayClassName="overlay"

        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            // marginRight: '-50%',
            // transform: 'translate(-50%, -50%)',
            width: '500',
            height: '500', // モーダルの高さを自動で調整
          },
          overlay: {
            width: '500',
            height: '500', // モーダルの高さを自動で調整
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}

      >
          
        <div className='modalContent'>
          <div className='modalContentWrapper'>
            <h2>内容を編集:{tabTitles[selectedTab]}</h2>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="editTextArea"
            />
            <button onClick={saveContent}>保存</button>
            <button onClick={closeModal}>キャンセル</button>
          </div>
        </div>
    </Modal>

    </>
  )
}

