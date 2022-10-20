package com.walletBankingApp.walletbankingapp.repository;

import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<TransactionEntity, String> {
    List<TransactionEntity> getAllTransactionsByEmail(String email, Pageable pageable);

    List<TransactionEntity> getTotalTransactionsByEmail(String email);
}
