# Order Book List

##

Request Parameters

[](#request-parameters)

| Field Name | Description                                                                                                  | Type    |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ------- |
| markets\*  | Market codes separated by spots(ex. SGD-BTC, BTC-XRP)                                                        | String  |
| count      | Number of order book units (ex. setting count=5 will return only the top 5 bid and ask entries. default: 30) | Integer |

##

Response

[](#response)

| Field Name      | Description                               | Type            |
| --------------- | ----------------------------------------- | --------------- |
| market          | Market ID                                 | String          |
| timestamp       | Order Book timestamp                      | Long            |
| total_ask_size  | Total remaining volume of asking orders.  | Double          |
| total_bid_size  | Total remaining volume of bidding orders. | Double          |
| orderbook_units | Order book details.                       | List of Objects |
| ask_price       | Ask price                                 | Double          |
| bid_price       | Bid price                                 | Double          |
| ask_size        | Remaining volume of Asking.               | Double          |
| bid_size        | Remaining volume of Bidding.              | Double          |

The `orderbook_units`list includes order book data in order, starting from the
best bid/ask (1st level) to the maximum 30th level.

markets

array of strings

required

Market ID (ex. SGD-BTC, BTC-XRP)

markets\*

ADD string

Number of order book units (ex. setting count=5 will return only the top 5 bid
and ask entries.)

# 200

## Query Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| market    | string | No       | timestamp   |

200

array of objects

object

integer

Defaults to 0

total_ask_size

number

Defaults to 0

total_bid_size

number

Defaults to 0

orderbook_units

array of objects

orderbook_units

object

ask_price

number

Defaults to 0

bid_price

number

Defaults to 0

ask_size

integer

Defaults to 0

bid_size

number

Defaults to 0

# 400

400

object

Updated 3 months ago

---

ShellNodeRubyPHPPython

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://exchange-region-endpoint-url.com/v1/orderbook?count=30' \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

1

\[

2

{

3

    "market": "BTC-XRP",

4

    "timestamp": 1746600759858,

5

    "total\_ask\_size": 92313.42613622,

6

    "total\_bid\_size": 56863.82934704999,

7

    "orderbook\_units": \[

8

      {

9

        "ask\_price": 0.0000222,

10

        "bid\_price": 0.0000221,

11

        "ask\_size": 4965,

12

        "bid\_size": 35.64310469

13

      },

14

      {

15

        "ask\_price": 0.00002221,

16

        "bid\_price": 0.00002201,

17

        "ask\_size": 2236.34218113,

18

        "bid\_size": 2712.88305315

19

      },

20

      {

21

        "ask\_price": 0.00002231,

22

        "bid\_price": 0.000022,

23

        "ask\_size": 2343.34854954,

24

        "bid\_size": 956.59727272

25

      },

26

      {

27

        "ask\_price": 0.00002232,

28

        "bid\_price": 0.00002199,

29

        "ask\_size": 1111.35591986,

30

        "bid\_size": 4706.14100019

31

      },

32

      {

33

        "ask\_price": 0.00002234,

34

        "bid\_price": 0.00002195,

35

        "ask\_size": 450.45045045,

36

        "bid\_size": 1026.29316628

37

      },

38

      {

39

        "ask\_price": 0.00002237,

40

        "bid\_price": 0.00002194,

41

        "ask\_size": 450.45045045,

42

        "bid\_size": 1033.00726186

43

      },

44

      {

45

        "ask\_price": 0.0000224,

46

        "bid\_price": 0.00002191,

47

        "ask\_size": 49.54954954,

48

        "bid\_size": 30

49

      },

50

      {

51

        "ask\_price": 0.0000227,

52

        "bid\_price": 0.0000219,

53

        "ask\_size": 569.35689531,

54

        "bid\_size": 692.9696347

55

      },

56

      {

57

        "ask\_price": 0.0000228,

58

        "bid\_price": 0.00002187,

59

        "ask\_size": 600,

60

        "bid\_size": 1000

61

      },

62

      {

63

        "ask\_price": 0.0000229,

64

        "bid\_price": 0.00002186,

65

        "ask\_size": 600,

66

        "bid\_size": 1499.36779505

67

      },

68

      {

69

        "ask\_price": 0.00002299,

70

        "bid\_price": 0.00002185,

71

        "ask\_size": 32304.88996445,

72

        "bid\_size": 257.67559367

73

      },

74

      {

75

        "ask\_price": 0.000023,

76

        "bid\_price": 0.00002184,

77

        "ask\_size": 600,

78

        "bid\_size": 94.94578571

79

      },

80

      {

81

        "ask\_price": 0.00002302,

82

        "bid\_price": 0.00002182,

83

        "ask\_size": 32737.53638733,

84

        "bid\_size": 258.02712927

85

      },

86

      {

87

        "ask\_price": 0.0000231,

88

        "bid\_price": 0.00002181,

89

        "ask\_size": 600,

90

        "bid\_size": 3.47320602

91

      },

92

      {

93

        "ask\_price": 0.0000232,

94

        "bid\_price": 0.00002173,

95

        "ask\_size": 600,

96

        "bid\_size": 1162.03865623

97

      },

98

      {

99

        "ask\_price": 0.00002324,

100

        "bid\_price": 0.0000217,

101

        "ask\_size": 18.428631,

102

        "bid\_size": 2800

103

      },

104

      {

105

        "ask\_price": 0.0000233,

106

        "bid\_price": 0.00002168,

107

        "ask\_size": 763.27275157,

108

        "bid\_size": 650.41

109

      },

110

      {

111

        "ask\_price": 0.00002332,

112

        "bid\_price": 0.00002155,

113

        "ask\_size": 1609.33817604,

114

        "bid\_size": 1000

115

      },

116

      {

117

        "ask\_price": 0.0000234,

118

        "bid\_price": 0.00002153,

119

        "ask\_size": 600,

120

        "bid\_size": 65.52136553

121

      },

122

      {

123

        "ask\_price": 0.0000235,

124

        "bid\_price": 0.0000215,

125

        "ask\_size": 600,

126

        "bid\_size": 4026.70533472

127

      },

128

      {

129

        "ask\_price": 0.00002352,

130

        "bid\_price": 0.00002148,

131

        "ask\_size": 59.9880024,

132

        "bid\_size": 1000

133

      },

134

      {

135

        "ask\_price": 0.0000236,

136

        "bid\_price": 0.00002147,

137

        "ask\_size": 600,

138

        "bid\_size": 187.60479739

139

      },

140

      {

141

        "ask\_price": 0.00002363,

142

        "bid\_price": 0.00002136,

143

        "ask\_size": 164.67393136,

144

        "bid\_size": 38.75536465

145

      },

146

      {

147

        "ask\_price": 0.00002368,

148

        "bid\_price": 0.00002135,

149

        "ask\_size": 400,

150

        "bid\_size": 1000

151

      },

152

      {

153

        "ask\_price": 0.0000237,

154

        "bid\_price": 0.00002133,

155

        "ask\_size": 600,

156

        "bid\_size": 22876.6636543

157

      },

158

      {

159

        "ask\_price": 0.00002374,

160

        "bid\_price": 0.00002131,

161

        "ask\_size": 98.71668314,

162

        "bid\_size": 1530.39456731

163

      },

164

      {

165

        "ask\_price": 0.0000238,

166

        "bid\_price": 0.0000213,

167

        "ask\_size": 600,

168

        "bid\_size": 5000

169

      },

170

      {

171

        "ask\_price": 0.00002382,

172

        "bid\_price": 0.00002126,

173

        "ask\_size": 5353.11093217,

174

        "bid\_size": 1000

175

      },

176

      {

177

        "ask\_price": 0.00002384,

178

        "bid\_price": 0.00002125,

179

        "ask\_size": 27.61668048,

180

        "bid\_size": 94.11764705

181

      },

182

      {

183

        "ask\_price": 0.0000239,

184

        "bid\_price": 0.00002118,

185

        "ask\_size": 600,

186

        "bid\_size": 124.59395656

187

      }

188

    \]

189

}

190

\]

Updated 3 months ago

---

> **Source:**
> [order-book-list](https://global-docs.upbit.com/reference/order-book-list)
