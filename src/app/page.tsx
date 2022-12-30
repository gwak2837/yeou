import Image from 'next/image'
import Link from 'next/link'

import Username from '../components/Username'
import SearchForm from './SearchForm'

export default function HomePage() {
  return (
    <>
      <main className="py-16 max-w-screen-md mx-auto">
        <SearchForm />
      </main>
      <footer className="grid gap-4 p-4 bg-slate-100">
        <h5 className="text-sm">
          본 사이트는 쿠팡 파트너스 · 오늘의집 큐레이터 · 11번가 머니백 활동의 일환으로, 제휴 링크를
          통해 구매 시 이에 따른 일정액의 수수료를 제공받습니다. 이렇게 발생한 수익은 서버 유지비로
          사용됩니다. 회원가입 후 설정에서 제휴 링크를 일반 링크로 변경할 수 있습니다.
        </h5>
        <h3>Copyright © {new Date().getUTCFullYear()} LobinReview</h3>
        <h4>All rights reserved.</h4>

        <div className="flex flex-wrap items-center gap-x-4">
          <a href="https://notion.site" target="_blank" rel="noreferrer">
            <h5>자주 묻는 질문</h5>
          </a>
          <a href="https://notion.site/" target="_blank" rel="noreferrer">
            <h5>이용약관</h5>
          </a>
          <a href="https://notion.site/" target="_blank" rel="noreferrer">
            <h5>개인정보처리방침</h5>
          </a>
          <a href="https://notion.site" target="_blank" rel="noreferrer">
            <h5>새소식 운영원칙</h5>
          </a>
        </div>

        <div className="text-xs text-slate-500">
          로빈리뷰(LobinReview) | 대표: 곽태욱 | 사업자등록번호:{' '}
          <a
            href="https://teht.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/ab/a/a/UTEABAAA13.xml"
            target="_blank"
            rel="noreferrer"
          >
            373-03-02023
          </a>
          <br />
          <a href="http://naver.me" target="_blank" rel="noreferrer">
            05309 서울특별시 강동구 상암로 111
          </a>{' '}
          | 이메일: <a href="mailto:jayudam2022@gmail.com">jayudam2022@gmail.com</a> | 고객센터:{' '}
          <a href="tel:010-0000-0000">010-0000-0000</a>
        </div>
      </footer>
    </>
  )
}
