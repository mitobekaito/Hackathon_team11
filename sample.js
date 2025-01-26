import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AuthApp() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => setIsLogin(!isLogin);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-2xl">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold text-gray-700">
              {isLogin ? 'ログイン' : '新規登録'}
            </h1>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {!isLogin && (
                <Input
                  type="text"
                  placeholder="名前"
                  className="w-full p-2 border rounded-xl"
                />
              )}
              <Input
                type="email"
                placeholder="メールアドレス"
                className="w-full p-2 border rounded-xl"
              />
              <Input
                type="password"
                placeholder="パスワード"
                className="w-full p-2 border rounded-xl"
              />
              <Button className="w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
                {isLogin ? 'ログイン' : '登録'}
              </Button>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-600">
                {isLogin ? 'アカウントをお持ちでない場合：' : 'すでにアカウントをお持ちの場合：'}
              </p>
              <button
                onClick={handleToggle}
                className="text-blue-500 hover:underline"
              >
                {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}