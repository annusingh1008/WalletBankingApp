package com.walletBankingApp.walletbankingapp.repository;

import com.walletBankingApp.walletbankingapp.entity.CashbackEntity;
import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CashbackRepository extends MongoRepository<CashbackEntity, String> {
    List<CashbackEntity> getAllcashbacksByEmail(String email);

    List<TransactionEntity> getTotalTransactionsByEmail(String email);
}
