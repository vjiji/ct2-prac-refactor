import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ImageContent from '../ImageContent';
import DescriptionContent from '../DescriptionContent';
import { getPostDetail } from '../../../../axios/postsAxios';
import queryKeys from '../../../../constants/queryKeys';

function DetailContents() {
  const { id } = useParams();

  const { data: post } = useQuery({
    queryKey: queryKeys.postDetail(id),
    queryFn: () => getPostDetail(id),
    enabled: !!id,
  });

  if (!post) return <div>..loading</div>;
  return (
    <DetailContentsLayout>
      <ImageContent url={post.url} />
      <DescriptionContent />
    </DetailContentsLayout>
  );
}

export default DetailContents;

const DetailContentsLayout = styled.div`
  width: 1016px;
  min-height: 500px;
  margin: 8px 0 16px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  display: flex;
`;
