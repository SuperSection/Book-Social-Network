package com.supersection.bsn.feedback.mapper;

import com.supersection.bsn.book.entity.Book;
import com.supersection.bsn.feedback.dto.FeedbackRequest;
import com.supersection.bsn.feedback.entity.Feedback;
import org.springframework.stereotype.Service;


@Service
public class FeedbackMapper {

    public Feedback toFeedback(FeedbackRequest request) {
        return Feedback.builder()
                .rating(request.rating())
                .comment(request.comment())
                .book(Book.builder()
                        .id(request.bookId())
                        .archived(false) // Not required & has no impact :: just to satisfy lombok
                        .shareable(false) // Not required & has no impact :: just to satisfy lombok
                        .build())
                .build();
    }

}