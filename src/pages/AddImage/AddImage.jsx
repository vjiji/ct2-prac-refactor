import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import IconBox from '../../components/IconBox';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import { SideOpenIcon, PlusIcon, UploadIcon, EditIcon } from '../../img/AddImageIcons';
import { postImage, postPost } from '../../axios/imagesAxios';

function AddImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
    link: '',
    imageId: '',
  });

  const navigate = useNavigate();

  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const formData = new FormData();
        formData.append('image', file);
        const imageUrl = await postImage(file);
        setSelectedFile(file);
        setPostContent((prevFormData) => ({
          ...prevFormData,
          imageId: imageUrl,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (!postContent.imageId) {
        alert('이미지를 등록해주세요.');
        return;
      }

      const postData = {
        title: postContent.title || ' ',
        content: postContent.content || ' ',
        link: postContent.link || ' ',
        imageId: postContent.imageId,
      };

      const response = await postPost(postData);
      console.log(response);
      navigate('/main');
    } catch (error) {
      console.log(postContent);
      console.log(error);
    }
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setPostContent((prevFormData) => ({
      ...prevFormData,
      title: value,
    }));
  };

  const handleContentChange = (e) => {
    const { value } = e.target;
    setPostContent((prevFormData) => ({
      ...prevFormData,
      content: value,
    }));
  };

  const handleLinkChange = (e) => {
    const { value } = e.target;
    setPostContent((prevFormData) => ({
      ...prevFormData,
      link: value,
    }));
  };

  return (
    <MainContainer>
      <SideBar>
        <SideIcon>
          <IconBox>
            <SideOpenIcon color={palette.black[0]} />
          </IconBox>
        </SideIcon>
        <SideIcon>
          <IconBox>
            <PlusIcon color={palette.black[0]} />
          </IconBox>
        </SideIcon>
        <DummyBox Small />
      </SideBar>
      <AddContainer>
        <TopBar>
          <TopTitle>핀 만들기</TopTitle>
          {selectedFile && (
            <ButtonWrapper>
              <Button Red onClick={handleSubmit}>
                게시
              </Button>
            </ButtonWrapper>
          )}
        </TopBar>
        <ImageAddContainer>
          <ImageAddSide>
            <ImageAddBox>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileSelect}
                style={{
                  position: 'absolute',
                  width: 370,
                  height: 450,
                  overflow: 'hidden',
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
              {selectedFile && (
                <ImageAddWrapper>
                  <EditButton onChange={handleFileSelect}>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileSelect}
                      style={{
                        position: 'absolute',
                        width: 370,
                        height: 450,
                        overflow: 'hidden',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
                    <EditIcon color={palette.black[0]} />
                  </EditButton>
                  <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" />
                </ImageAddWrapper>
              )}
              {!selectedFile && (
                <>
                  <IconBox>
                    <UploadIcon color={palette.black[0]} />
                  </IconBox>
                  <BoxText>파일을 선택하거나 여기로 끌어다 놓으세요.</BoxText>
                  <BoxNotice>Pinterest는 20MB 미만의 고화질 .jpg 파일 사용을 권장합니다.</BoxNotice>
                </>
              )}
            </ImageAddBox>
            <DummyBox Long />
            <Button GrayLong>URL에서 저장</Button>
          </ImageAddSide>
          <ImageInputSide selectedFile={selectedFile}>
            <InputWrapper>
              <InputName>제목</InputName>
              <LabelInput type="title" placeholder="제목 추가" value={postContent.title} onChange={handleTitleChange} />
            </InputWrapper>
            <InputWrapper>
              <InputName>설명</InputName>
              <InputHigh
                type="content"
                placeholder="자세한 설명을 추가하세요"
                value={postContent.content}
                onChange={handleContentChange}
              />
            </InputWrapper>
            <InputWrapper>
              <InputName>링크</InputName>
              <LabelInput type="link" placeholder="링크 추가" value={postContent.link} onChange={handleLinkChange} />
            </InputWrapper>
            <InputNotice>
              불법 촬영 콘텐츠 등을 게시하는 경우 Pinterest는 한국 전기통신사업법 22-5조에 따라 해당 콘텐츠의 액세스를
              삭제하거나 차단할 수 있으며, 사용자는 관련 법률 및 규정에 따라 처벌 받을 수 있습니다.
            </InputNotice>
          </ImageInputSide>
        </ImageAddContainer>
      </AddContainer>
    </MainContainer>
  );
}

export default AddImage;

const MainContainer = styled.div`
  border-top: 1px solid #ccc;
`;

const SideBar = styled.div`
  position: fixed;
  padding-top: 80px;
  top: 0;
  left: 0;
  width: 85px;
  height: 100%;
  background-color: white;
  border-right: 1px solid #ccc;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const AddContainer = styled.div`
  margin-left: 85px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 85px;
  width: calc(100% - 85px);
  height: 80px;
  padding-top: 80px;
  border-bottom: 1px solid #ccc;
  background-color: white;
`;

const ButtonWrapper = styled.div`
  margin-right: 15px;
`;

const TopTitle = styled.div`
  margin: 0;
  padding: 5px 25px;
  font-weight: bold;
  font-size: 20px;
`;

const SideIcon = styled.div`
  width: 48px;
  height: 48px;
  padding: 15px;
`;

const ImageAddContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-top: 185px;
`;

const ImageAddSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 370px;
`;

const ImageInputSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 50px;
  opacity: ${(props) => (props.selectedFile ? '1' : '0.5')};
  pointer-events: ${(props) => (props.selectedFile ? 'auto' : 'none')};
`;

const InputWrapper = styled.div`
  width: 530px;
  padding-bottom: 15px;
`;

const InputName = styled.div`
  padding: 10px 0px 0px 5px;
  font-size: 13px;
  text-align: left;
`;

const InputNotice = styled.div`
  width: 530px;
  margin-left: 10px 0px 0px 5px;
  font-size: 13px;
  text-align: left;
`;

const ImageAddBox = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 370px;
  height: 450px;
  border: 2px dashed ${palette.gray[6]};
  border-radius: 30px;
  background-color: ${palette.gray[0]};
  cursor: pointer;
`;

const BoxText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
  width: 220px;
  text-align: center;
`;

const BoxNotice = styled.div`
  position: absolute;
  bottom: 0;
  padding-bottom: 20px;
  width: 350px;
  font-size: 13px;
  text-align: center;
`;

const DummyBox = styled.div`
  margin-bottom: 25px;
  border-bottom: 1px solid #ccc;
  ${(props) =>
    props.Long &&
    css`
      width: 370px;
      height: 25px;
    `}
  ${(props) =>
    props.Small &&
    css`
      width: 85px;
      height: 5px;
    `}
`;

const InputHigh = styled.textarea`
  box-sizing: border-box;
  resize: none;
  width: 100%;
  height: 105px;
  margin: 8px 0px 15px 0px;
  padding: 12px 16px;
  border: 2px solid #cdcdcd;
  border-radius: 16px;
  color: ${palette.black[0]};
  font-size: 16px;

  &::placeholder {
    position: absolute;
    top: 15px;
    left: 16px;
  }

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5);
    outline: 0;
  }
`;

const ImageAddWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 370px;
  height: 450px;
  border-radius: 30px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 43px;
  height: 43px;
  border: none;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${palette.gray[0]};
  }
`;
