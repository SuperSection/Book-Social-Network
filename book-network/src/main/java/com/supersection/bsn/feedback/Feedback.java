package com.supersection.bsn.feedback;

import com.supersection.bsn.book.entity.Book;
import com.supersection.bsn.shared.BaseAuditingEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Feedback extends BaseAuditingEntity<Integer> {

    private Double rating;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

}
