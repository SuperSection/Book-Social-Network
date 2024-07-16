package com.supersection.bsn.book;

import com.supersection.bsn.feedback.Feedback;
import com.supersection.bsn.history.BookTransactionHistory;
import com.supersection.bsn.shared.BaseAuditingEntity;
import com.supersection.bsn.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book extends BaseAuditingEntity<Integer> {

    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;

    @Column(name = "book_cover")
    private String bookCover;

    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book")
    @Column(name = "transaction_histories")
    private List<BookTransactionHistory> transactionHistories;

}
