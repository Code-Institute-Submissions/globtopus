import unittest

from my_sum import sum


class TestSum(unittest.TestCase):
    def test_list_int(self):
        """
        Test that it can sum a list of integers
        """
        data = [1, 2, 3]
        result = sum(data)
        self.assertEqual(result, 6)




# class TestBasic(unittest.TestCase):
#     def setUp(self):
#         # Load test data
#         self.app = App(database='fixtures/test_users.json')
#
#     def test_customer_count(self):
#         self.assertEqual(len(self.app.users), 100)
#
#     def test_existence_of_customer(self):
#         user = self.app.get_user(email='user_ao_2_@globi.com')
#         self.assertEqual(user.name, "user_ao_2")
#
#
#
# class TestComplexData(unittest.TestCase):
#     def setUp(self):
#         # load test data
#         self.app = App(database='fixtures/test_users.json')
#
#     def test_customer_count(self):
#         self.assertEqual(len(self.app.customers), 10000)
#
#     def test_existence_of_customer(self):
#         user = self.app.get_user(email='user_ao_1_@globi.com')
#         self.assertEqual(user.name, "user_ao_1")

if __name__ == '__main__':
    unittest.main()