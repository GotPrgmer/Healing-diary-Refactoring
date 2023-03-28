package com.ssafy.healingdiary.domain.diary.service;

import com.ssafy.healingdiary.domain.diary.domain.Comment;
import com.ssafy.healingdiary.domain.diary.dto.CommentCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import com.ssafy.healingdiary.domain.diary.dto.CommentUpdateRequest;
import com.ssafy.healingdiary.domain.diary.repository.CommentRepository;
import com.ssafy.healingdiary.domain.diary.repository.DiaryRepository;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.error.CustomException;
import com.ssafy.healingdiary.global.error.ErrorCode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    public Slice<CommentResponse> getCommentList(Long diaryId, Pageable pageable) {
        Slice<Comment> comments = commentRepository.findByDiaryIdAndParentIdIsNull(diaryId, pageable);
        List<CommentResponse> commentResponses = comments.getContent()
            .stream()
            .map(comment -> {
                List<CommentResponse> children = comment.getChildren()
                    .stream()
                    .map(child -> {
                        return CommentResponse.builder()
                            .commentId(child.getId())
                            .memberId(child.getMember().getId())
                            .parentId(child.getParent() != null ? child.getParent().getId() : null)
                            .memberImageUrl(child.getMember().getMemberImageUrl())
                            .nickname(child.getMember().getNickname())
                            .datetime(child.getCreatedDate())
                            .content(child.getContent())
                            .build();
                    })
                    .collect(Collectors.toList());

                return CommentResponse.builder()
                    .commentId(comment.getId())
                    .memberId(comment.getMember().getId())
                    .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                    .memberImageUrl(comment.getMember().getMemberImageUrl())
                    .nickname(comment.getMember().getNickname())
                    .datetime(comment.getCreatedDate())
                    .content(comment.getContent())
                    .children(children != null && !children.isEmpty() ? children : null)
                    .build();
            })
            .collect(Collectors.toList());

        return new SliceImpl<>(commentResponses, pageable, comments.hasNext());
    }

    public Map<String, Object> createComment(CommentCreateRequest request) {

        Comment comment = Comment.builder()
            .member(memberRepository.getReferenceById(request.getMemberId()))
            .parent((commentRepository.getReferenceById(request.getParentId())))
            .content(request.getContent())
            .build();

        Long savedCommentId = commentRepository.save(comment).getId();

        Map<String, Object> map = new HashMap<>();
        map.put("commentId", savedCommentId);
        return map;
    }

    public Map<String, Object> updateComment(CommentUpdateRequest request) {
        Comment comment = commentRepository.findById(request.getCommentId())
            .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        if(request.getMemberId() != comment.getMember().getId()){
            throw new CustomException(ErrorCode.FORBIDDEN);
        }

        comment.updateContent(request.getContent());
        Long savedCommentId = commentRepository.save(comment).getId();

        Map<String, Object> map = new HashMap<>();
        map.put("commentId", savedCommentId);
        return map;
    }

    public void deleteComment(Long memberId, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        if(memberId != comment.getMember().getId()){
            throw new CustomException(ErrorCode.FORBIDDEN);
        }

        commentRepository.deleteById(commentId);
    }
}