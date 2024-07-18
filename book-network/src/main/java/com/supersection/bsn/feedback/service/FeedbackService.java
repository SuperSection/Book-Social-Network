package com.supersection.bsn.feedback.service;

import com.supersection.bsn.book.entity.Book;
import com.supersection.bsn.book.repository.BookRepository;
import com.supersection.bsn.exception.OperationNotPermittedException;
import com.supersection.bsn.feedback.dto.FeedbackRequest;
import com.supersection.bsn.feedback.entity.Feedback;
import com.supersection.bsn.feedback.mapper.FeedbackMapper;
import com.supersection.bsn.feedback.repository.FeedbackRepository;
import com.supersection.bsn.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;


    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new EntityNotFoundException("No book found with the ID::" + request.bookId()));

        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a feedback for an archived or not shareable book.");
        }

        User user = (User) connectedUser.getPrincipal();
        if (Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give a feedback to your own book.");
        }

        Feedback feedback = feedbackMapper.toFeedback(request);
        return feedbackRepository.save(feedback).getId();
    }

}
