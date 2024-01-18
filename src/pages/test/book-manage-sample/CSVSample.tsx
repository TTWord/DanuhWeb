import styled, { css, keyframes } from 'styled-components';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import useGetWord from '@/pages/book/_id/BookDet/hooks/useGetWord';

const CSVSample = () => {
  const [bookname, setBookFile] = useState('');

  const [dataTest, setDataTest] = useState<string[]>([]);
  const [bookContents, setBookContents] = useState('');

  // 가져온 csv 파일을 헤더에 맞게 {word: '', mean: ''}[] 로 변환
  const parseCSV = (csvData: string) => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1);

    const parsedData = data.map((line) => {
      const values = line.split(',');

      return headers.reduce((obj: any, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });

    return parsedData;
  };

  const [parseCSVData, setParseCSVData] =
    useState<{ word: string; mean: string }[]>();

  // csv 파일을 업로드 해서 내용물 가져오는 함수
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file: File = e.target.files[0];
    const name = file.name.split('.')[0];
    setBookFile(file.name.split('.')[0]);
    setBookFile(name);

    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // csv 파일 그대로 가져오기
        const contents = e.target?.result as string;
        setBookContents(contents);

        const data = parseCSV(contents);
        setParseCSVData(data);

        // 줄별로 나누기
        const split = contents.split('\n');
        setDataTest(split);
      };
    }
  };

  const onClick = () => {
    console.log('bookname', bookname);
    console.log('bookContents split한거\n', bookContents);
    console.log('dataTest 원본\n', dataTest);

    const a = parseCSV(bookContents);
    console.log('parseCSV\n', a);

    console.log('parseCSVData\n', parseCSVData);
  };

  const headers = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Email', key: 'email' },
  ];

  const data = [
    { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
    { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
    { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
  ];

  const [words, setWords] = useState([]);

  const getWord = useGetWord();
  const getBook = async () => {
    const response = await getWord(35);

    setWords(response);
  };

  useEffect(() => {
    getBook();
  }, []);

  const danuhHeaders = [
    { label: 'word', key: 'word' },
    { label: 'mean', key: 'mean' },
  ];

  const [myData, setMyData] = useState<{ word: string; mean: string }[]>([]);

  const fileiputRef = useRef<HTMLInputElement>(null);

  const csvLinkRef = useRef<CSVLink | any>(null);

  const fileUpload = () => {
    csvLinkRef.current.click();
  };

  return (
    <Container>
      <div>CSV Test Page</div>
      <FileInput
        ref={fileiputRef}
        type="file"
        accept=".csv"
        onChange={(e) => onChangeHandler(e)}
      />
      <button
        onClick={() => {
          console.log('words', words);
          console.log('myData', myData);
        }}
      >
        print book
      </button>

      <button
        onClick={async () => {
          const temp: { word: string; mean: string }[] = [];
          words.map((item: any) => {
            console.log(item.word);
            temp.push({ word: item.word, mean: item.mean });
          });

          setMyData(temp);
        }}
      >
        print data from book 35
      </button>

      <button onClick={onClick}>print csv</button>

      <button
        onClick={() => {
          console.log('myHeaders', danuhHeaders);
          console.log('myData', myData);
          console.log('myData length', myData.length);
        }}
      >
        print mine
      </button>

      <button
        onClick={() => {
          if (!csvLinkRef.current) return;
          console.log(csvLinkRef.current);
          csvLinkRef.current.link.click();
        }}
      >
        click link
      </button>

      {/* 내가 클릭해서 다운받기, Link태그라 숨기고  */}

      <CSVLink
        ref={csvLinkRef}
        headers={danuhHeaders}
        data={myData}
        filename="myCSV.csv"
        uFEFF={true}
        onClick={() => {
          console.log('export!');
        }}
      >
        Export my CSV
      </CSVLink>

      {/* 작업이 끝나면 바로 다운로드 받게 하기 */}
      {/* {myData.length !== 0 && (
        <CSVDownload
          headers={myHeaders}
          data={myData}
          filename="myCSV.csv"
          target="_blank"
        />
      )} */}
    </Container>
  );
};

export default CSVSample;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: aqua;
  display: flex;
  flex-direction: column;
`;

const FileInput = styled.input``;
