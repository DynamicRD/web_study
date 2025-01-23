
CREATE TABLE basket
(
  b_id    number(6)    NOT NULL,
  id      number(6)    NOT NULL,
  g_id    number(6)    NOT NULL,
  price   number(6)    NULL     COMMENT '비용',
  regdate date         NULL     DEFAULT sysdate COMMENT '신청일',
  status  varchar2(20) NULL     COMMENT '찜,승인대기,종료',
  PRIMARY KEY (b_id)
) COMMENT '모임장바구니';

CREATE TABLE comment
(
  c_id     number(6)    NOT NULL,
  id       number(6)    NOT NULL,
  r_id     number(6)    NOT NULL,
  content               NULL    ,
  REF       NUMBER(5,0) NULL     DEFAULT 0,
  STEP     NUMBER(3,0)  NULL     DEFAULT 0,
  DEPTH    NUMBER(3,0)  NULL     DEFAULT 0,
  NUMREF   NUMBER(7,0)  NULL     DEFAULT 0,
  nickname VARCHAR2(50) NULL     COMMENT '닉네임',
  regdate  date         NULL     DEFAULT sysdate,
  PRIMARY KEY (c_id)
) COMMENT '댓글(답변형)';

CREATE TABLE FAQ
(
  n_id    number(6)     NOT NULL,
  title   varchar2(50)  NULL    ,
  content varchar2(255) NULL    
) COMMENT 'FAQ';

CREATE TABLE group
(
  g_id      number(6)     NOT NULL,
  id        number(6)     NOT NULL COMMENT '모임장',
  title     varchar2(100) NULL     COMMENT '모임명',
  regdate   date          NULL     DEFAULT sysdate COMMENT '개설일',
  theme     varchar2(50)  NULL     COMMENT '테마',
  user_max  number(3)     NULL     COMMENT '최대모임원',
  price     number(6)     NULL     COMMENT '비용',
  area      varchar2(50)  NULL     COMMENT '모임장소',
  startdate date          NULL     COMMENT '모임시작일',
  lastdate  date          NULL     COMMENT '모임종료일',
  content1  varchar2(255) NULL     COMMENT '자기PR',
  content2  varchar2(255) NULL     COMMENT '모임소개글',
  content3  varchar2(255) NULL     COMMENT '세부사항',
  status    varchar2(20)  NULL     COMMENT '관리자 승인여부',
  views     number(6)     NULL     COMMENT '조회수',
  PRIMARY KEY (g_id)
) COMMENT '모임';

CREATE TABLE group_info
(
  g_info_id number(6)    NOT NULL,
  g_id      number(6)    NOT NULL,
  imgurl    varchar2(50) NULL     COMMENT '사진',
  PRIMARY KEY (g_info_id)
) COMMENT '모임 이미지';

CREATE TABLE notice
(
  n_id    number(6)     NOT NULL,
  title   varchar2(50)  NULL    ,
  content varchar2(255) NULL    ,
  PRIMARY KEY (n_id)
) COMMENT '공지사항';

CREATE TABLE notification
(
  n_id    number(6)     NOT NULL,
  id      number(6)     NOT NULL,
  content varchar2(255) NULL    ,
  is_read varchar2(1)   NULL     DEFAULT 'N' COMMENT '읽음여부',
  regdate date          NULL     DEFAULT sysdate COMMENT '알림일',
  PRIMARY KEY (n_id)
) COMMENT '알림';

CREATE TABLE review
(
  r_id     number(6)     NOT NULL,
  id       number(6)     NOT NULL,
  g_id     number(6)     NOT NULL,
  title    varchar2(50)  NULL    ,
  imgurl   varchar2(50)  NULL    ,
  content  varchar2(255) NULL    ,
  views    number(6)     NULL     COMMENT '조회수',
  comments               NULL     COMMENT '댓글수',
  star     number(1)     NULL     DEFAULT 0 COMMENT '별점',
  PRIMARY KEY (r_id)
) COMMENT '리뷰게시판';

CREATE TABLE user
(
  id          number(6)     NOT NULL,
  email       varchar2(50)  NULL    ,
  provider    VARCHAR2(50)  NULL     COMMENT 'OAuth 제공자 (google, naver 등)',
  provider_id VARCHAR2(50)  NULL     COMMENT 'OAuth 제공자의 고유 ID',
  phone       varchar2(20)  NULL    ,
  name        varchar2(20)  NULL    ,
  nickname    VARCHAR2(50)  NULL     COMMENT '닉네임',
  birth       date          NULL    ,
  gender      varchar2(6)   NULL    ,
  money       number(10)    NULL     DEFAULT 0 COMMENT '소지금',
  zipcode     varchar2(10)  NULL    ,
  addr1       varchar2(50)  NULL    ,
  addr2       varchar2(50)  NULL    ,
  star_sum    number(6)     NULL     DEFAULT 0 COMMENT '별점총합',
  black       number(6)     NULL     DEFAULT 0 COMMENT '신고횟수',
  regdate     date          NULL     DEFAULT sysdate COMMENT '가입일',
  imgurl      varchar2(50)  NULL     COMMENT '사진',
  self-pr     VARCHAR2(255) NULL     COMMENT '자기소개',
  PRIMARY KEY (id)
) COMMENT '사용자';

CREATE TABLE user_group
(
  u_g_id number(6)    NULL    ,
  id     number(6)    NOT NULL,
  g_id   number(6)    NOT NULL,
  status varchar2(20) NULL     COMMENT '찜,승인대기,멤버,모임장'
) COMMENT '모임-사용자';

ALTER TABLE group_info
  ADD CONSTRAINT FK_group_TO_group_info
    FOREIGN KEY (g_id)
    REFERENCES group (g_id);

ALTER TABLE user_group
  ADD CONSTRAINT FK_group_TO_user_group
    FOREIGN KEY (g_id)
    REFERENCES group (g_id);

ALTER TABLE review
  ADD CONSTRAINT FK_group_TO_review
    FOREIGN KEY (g_id)
    REFERENCES group (g_id);

ALTER TABLE comment
  ADD CONSTRAINT FK_review_TO_comment
    FOREIGN KEY (r_id)
    REFERENCES review (r_id);

ALTER TABLE user_group
  ADD CONSTRAINT FK_user_TO_user_group
    FOREIGN KEY (id)
    REFERENCES user (id);

ALTER TABLE review
  ADD CONSTRAINT FK_user_TO_review
    FOREIGN KEY (id)
    REFERENCES user (id);

ALTER TABLE comment
  ADD CONSTRAINT FK_user_TO_comment
    FOREIGN KEY (id)
    REFERENCES user (id);

ALTER TABLE basket
  ADD CONSTRAINT FK_user_TO_basket
    FOREIGN KEY (id)
    REFERENCES user (id);

ALTER TABLE basket
  ADD CONSTRAINT FK_group_TO_basket
    FOREIGN KEY (g_id)
    REFERENCES group (g_id);

ALTER TABLE group
  ADD CONSTRAINT FK_user_TO_group
    FOREIGN KEY (id)
    REFERENCES user (id);

ALTER TABLE notification
  ADD CONSTRAINT FK_user_TO_notification
    FOREIGN KEY (id)
    REFERENCES user (id);
